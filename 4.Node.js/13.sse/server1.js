const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/events", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");
  // 클라이언트가 접속시 현재 시간
  const sendTime = () => {
    // 데이터는 data: 으로 시작해서 내용을 담고 \n\n으로 끝나는 것이 기본 프로토콜임
    res.write(`data: ${new Date().toISOString()}\n\n`);
  };
  const interval = setInterval(sendTime, 1000);
  res.send("hello");

  req.on("close", () => {
    clearInterval(interval);
    console.log("사용자 종료");
  });
});
app.listen(port, () => {
  console.log("서버 레디");
});
