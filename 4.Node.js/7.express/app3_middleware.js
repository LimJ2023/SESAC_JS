const express = require("express");
const app = express();
const port = 3000;

//미들웨어 등록 <-- 함수 순서 중요함.
app.use(myLogger);
app.use(mySecurity);

app.get("/", (req, res) => {
  const timeString = new Date(req.requestedTime).toString();
  res.send(`헬로우를 요청한 시간은 ${timeString}`);
});

function myLogger(req, _, next) {
  console.log("로그 진입" + req.url);
  next();
}

function mySecurity(req, _, next) {
  console.log("2번째 함수.");
  req.requestedTime = Date.now();
  console.log("요청시간 : ", req.requestedTime);
  next();
}

app.listen(port, () => {
  console.log("서버 레디");
});
