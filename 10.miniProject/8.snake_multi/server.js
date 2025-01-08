const express = require("express");
const expressWs = require("express-ws");
const { generateFood, moveSnake, checkEndGame } = require("./game");
const app = express();
const path = require("path");
const port = 8000;
expressWs(app);

//일단 플레이어 1명이 가능하게 해보기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(express.static(path.join(__dirname, "public")));

const wsClients = new Map();
const snakes = new Map();
const colors = ["red", "green", "blue", "yellow", "purple"];
const food = [];
const blockSize = 20;
const snakeSpped = 2000;
const winWidth = 400;
const winHeight = 400;
const boardSize = winWidth / blockSize;
let interval;

//더미데이터 넣어보기
snakes.set("user1", {
  direction: "right",
  body: [{x: 10, y: 10}],
  score: 0,
  isDead: false,
  color: "red",
  userName: "user1",
});


app.ws("/snake", (ws, req) => {
  ws.on("connection", (ws) => {
    const userName = req.query.userName;
    if (userName && !wsClients.has(userName)) {
      wsClients.set(userName, ws); 
      console.log(`새로운 사용자 접속 :${userName}님`);
      createNewSnake(userName);
      }
  })

  ws.on("message", (message) => {
    const messageString = message.toString("utf8");
    const parsedMessage = JSON.parse(messageString);
    const userName = parsedMessage.userName;
    const direction = parsedMessage.direction;
    const type = parsedMessage.type;

    if (type === "start") {
      if (userName && !wsClients.has(userName)) {
        wsClients.set(userName, ws); 
        console.log(`새로운 사용자 접속 :${userName}님`);
        const data = { type: "start", winWidth, winHeight, blockSize, boardSize };
        createNewSnake(userName);
        broadcast(data);
      }
    }

    if (type === "keypress") {
      const snake = snakes.get(userName);
      if( snake && direction) {
        snake.direction = direction;
      }
    }
  });
});

app.get("/snake", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  
  interval = setInterval(() => {
    for(const snake of snakes.values()) {
      moveSnake(snake);
      if(checkEndGame(snake.body)) {
        snake.isDead = true;
        console.log(`뱀이 죽었습니다...`);
        const data = { type: "end", message: "게임종료" };
        broadcast(data);
        // wsClients.delete(snake.userName);
        snakes.delete(snake.userName);
      }
    }
    // Map을 일반 객체로 변환
    const snakesObject = Object.fromEntries(snakes);
    const data = { 
      type: "update", 
      snakes: snakesObject,
      food
    };
    broadcast(data);
  }, snakeSpped);

  res.on("close", () => {
    clearInterval(interval);
  });
});

function createNewSnake(userName) {
  const snake = {
    direction: "right",
    body: [{x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)}],
    score: 0,
    isDead: false,
    color: colors[Math.floor(Math.random() * colors.length)],
    userName: userName,
  }
  snakes.set(userName, snake);
  console.log(`새로운 뱀 생성 : ${userName}님`);
}

function broadcast(data) {
  wsClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

app.listen(port, () => {
  console.log("서버 실행중 포트 : ", port);
});
