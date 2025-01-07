const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress2.html"));
});

const newsArticles = [
  `"새로운 모바일 AI 경험" 23일 나타날 갤럭시 S25, 얼마나 더 똑똑해졌을까`,
  `AMD, 9950X3D·라이젠 AI 맥스 등 공개··· ‘라인업 더 촘촘히’[CES 2025]`,
  `액션스퀘어 장현국 '크로스 코인' 발행…"공급량 10억개 고정"`,
  `KAIST ‘초세대 협업연구실’ 3곳 추가 개소`,
  `현대모비스와 손잡은 퀄컴…차세대 ADAS·디지털 콕핏 시스템 구현`,
];
app.get("/news", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  const sendRandomNews = () => {
    const randIndex = Math.floor(Math.random() * newsArticles.length);
    const news = newsArticles[randIndex];
    res.write(`data:${JSON.stringify({ news })}\n\n`);
  };

  // 2~5초 사이에 랜덤값으로 보내기
  const interval = setInterval(() => {
    sendRandomNews;
  }, Math.floor(Math.random() * 3000) + 2000); //2초에서 5초

  req.on("close", () => {
    clearInterval(interval);
    console.log("사용자 종료");
  });
});
app.listen(port, () => {
  console.log("서버 레디");
});
