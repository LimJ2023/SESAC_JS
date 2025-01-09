const express = require("express");
const expressWs = require("express-ws");
const { generateFood, moveSnake, checkEndGame } = require("./game");
const app = express();
const path = require("path");
const port = 8000;
expressWs(app);
const WebSocket = require('ws');

// 일단 플레이어 1명이 가능하게 해보기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(express.static(path.join(__dirname, "public")));

const wsClients = new Map();
const snakes = new Map();
const colors = ["green", "blue", "yellow", "purple", "pink", "orange", "brown", "gray", "black"];
const food = [];
const blockSize = 20;
const snakeSpped = 200;
const winWidth = 600;
const winHeight = 600;
const boardSize = winWidth / blockSize;
const maxFood = 5; // 최대 음식 개수
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
        createNewSnake(userName);
      }
      const data = { type: "start", winWidth, winHeight, blockSize, boardSize };
      broadcast(data);
    }

    if (type === "keypress") {
      const snake = snakes.get(userName);
      if( snake && direction) {
        snake.direction = direction;
      }
    }
  });

  ws.on("close", () => {
    let disconnectedUser;
    wsClients.forEach((client, userName) => {
      if (client === ws) {
        disconnectedUser = userName;
      }
    });

    if (disconnectedUser) {
      wsClients.delete(disconnectedUser);
      snakes.delete(disconnectedUser);
      console.log(`${disconnectedUser}님이 게임을 나갔습니다.`);

    }
  });
});

app.get("/snake", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  // 초기 음식 생성
  generateInitialFood();
  
  interval = setInterval(() => {
    // 음식 생성
    if (food.length < maxFood) {
      const newFood = generateFood(boardSize, food, Array.from(snakes.values()).map(snake => snake.body));
      if (newFood) {
        food.push(newFood);
      }
    }

    for(const snake of snakes.values()) {
      const oldHead = snake.body[0];
      moveSnake(snake);
      
      // 음식을 먹었는지 확인
      const foodIndex = food.findIndex(f => f.x === oldHead.x && f.y === oldHead.y);
      if (foodIndex !== -1) {
        snake.score += 1;
        food.splice(foodIndex, 1);
        snake.body.push({});
        
        // 점수 업데이트를 모든 클라이언트에게 전송
        broadcast({
          type: "scoreUpdate",
          userName: snake.userName,
          score: snake.score
        });
      }

      // 게임 종료시 최종 점수 전송
      if(checkEndGame(snake.body, snake.body[0], boardSize)) {
        snake.isDead = true;
        console.log(`${snake.userName}님 게임 종료! 최종 점수: ${snake.score}`);
        broadcast({
          type: "end",
          userName: snake.userName,
          finalScore: snake.score,
          message: `${snake.userName}님 게임 종료! 최종 점수: ${snake.score}`
        });
        wsClients.delete(snake.userName);
        snakes.delete(snake.userName);
      }
    }

    // 현재 게임 상태 전송 시 점수도 포함
    const snakesObject = Object.fromEntries(snakes);
    const data = { 
      type: "update", 
      snakes: snakesObject,
      food,
      scores: Array.from(snakes.values()).map(snake => ({
        userName: snake.userName,
        score: snake.score,
        color: snake.color
      }))
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
    body: [{x: Math.floor(Math.random() * boardSize / 2), y: Math.floor(Math.random() * boardSize / 2)}],
    score: 0,
    isDead: false,
    color: colors[Math.floor(Math.random() * colors.length)],
    userName: userName,
  }
  snakes.set(userName, snake);
  console.log(`새로운 뱀 생성 : ${userName}님`);
  
  // 새로운 플레이어 참가 알림
  broadcast({
    type: "newPlayer",
    userName: userName,
    color: snake.color,
    score: 0
  });
}

function broadcast(data) {
  wsClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// 초기 음식 생성 함수
function generateInitialFood() {
  for (let i = 0; i < maxFood; i++) {
    const newFood = generateFood(boardSize, food, Array.from(snakes.values()).map(snake => snake.body));
    if (newFood) {
      food.push(newFood);
    }
  }
}


app.listen(port, () => {
  console.log("서버 실행중 포트 : ", port);
});
