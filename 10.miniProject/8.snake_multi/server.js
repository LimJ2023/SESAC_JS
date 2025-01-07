const express = require("express");
const expressWs = require("express-ws");
const app = express();
const path = require("path");
const port = 8000;
expressWs(app);

//일단 플레이어 1명이 가능하게 해보기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const wsClients = new Map();

app.ws("/snake", (ws, req) => {
  ws.on("message", (message) => {
    const messageString = message.toString("utf8");
    const parsedMessage = JSON.parse(messageString);
    const userName = parsedMessage.userName;
    const direction = parsedMessage.direction;

    if (userName && !wsClients.has(userName)) {
      wsClients.set(userName, ws); // 새로운 사용자면 목록에 추가
      console.log(
        `새로운 사용자 접속 : ${chatRooms.get(userName)} 방, ${userName}님`
      );
    }

    
  });
});

app.listen(port, () => {
  console.log("서버 실행중 포트 : ", port);
});
