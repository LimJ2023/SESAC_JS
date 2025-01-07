const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress2.html"));
});
app.get("/progress", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    res.write(`data:${JSON.stringify({ progress })}\n\n`);

    if (progress >= 100) {
      clearInterval(interval);
      res.end();
    }
  }, 500);

  req.on("close", () => {
    clearInterval(interval);
    console.log("사용자 종료");
  });
});
app.listen(port, () => {
  console.log("서버 레디");
});
