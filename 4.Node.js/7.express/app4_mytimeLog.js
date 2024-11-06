const express = require("express");
const app = express();
const port = 3000;

//미들웨어 등록 <-- 함수 순서 중요함.
app.use(requestTime);
app.use(myLogger);

app.get("/", (req, res) => {
  const timeString = new Date(req.requestedTime).toString();
  res.send(`헬로우를 요청한 시간은 ${timeString}`);
});

function requestTime(req, _, next) {
  req.requestedTime = Date.now();
  next();
}
function myLogger(req, _, next) {
  const formattedTime = new Date(req.requestedTime).toLocaleString();
  console.log(`LOG : ${formattedTime} - ${req.method} ${req.url}`);
  next();
}

function myMiddleware(req, res, next) {
  console.log("테스트1");
  next();
}

app.get("/about", myMiddleware, (req, res) => {
  res.send("about 페이지 입니다.");
});

app.get("/error", (req, res) => {
  throw new Error("강제로 에러 유발");
});
//에러처리용 미들웨어 추가 <- 가장 마지막에 추가해야 함
app.use((err, req, res, next) => {
  console.error("에러 발생 : ", err.message);
  res.status(500).json({ message: "서버 내부 오류 " });
});

app.listen(port, () => {
  console.log("서버 레디");
});
