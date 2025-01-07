const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

const app = express();
const port = 8000;
expressWs(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress2.html"));
});

// 3000번 포트를 웹소켓으로 업그레이드

app.ws("/progress", (ws, req) => {
  let progress = 0;
  let interval;
  ws.on("message", (message) => {
    if (message.toString() === "stop") {
      clearInterval(interval);
      console.log("중지");
    } else if (message.toString() === "start") {
      interval = setInterval(() => {
        progress += 10;
        ws.send(JSON.stringify({ progress }));
        if (progress >= 100) {
          clearInterval(interval);
          console.log("작업완료");
        }
      }, 500);
    }
  });
});
app.listen(port, () => {
  console.log("서버 레디 포트 : ", port);
});
