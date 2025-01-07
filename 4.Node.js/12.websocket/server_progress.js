const express = require("express");
const expressWs = require("express-ws");
const { WebSocketServer } = require("ws");
const path = require("path");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress.html"));
});

const server = app.listen(port, () => {
  console.log("서버 레디 포트 : ", port);
});
// 3000번 포트를 웹소켓으로 업그레이드
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("클라이언트 웹소켓으로 접속");
  ws.on("message", (message) => {
    if (message.toString() === "start") {
      let progress = 0;

      const interval = setInterval(() => {
        progress += 10;
        ws.send(JSON.stringify({ progress }));
        if (progress >= 100) {
          clearInterval(interval);
          console.log("작업완료");
        }
      }, 500);
      ws.send(JSON.stringify({ progress }));
    }
  });
});
