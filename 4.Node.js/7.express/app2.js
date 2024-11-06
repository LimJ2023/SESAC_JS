const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("결과 출력");
});
app.get("/users", (req, res) => {
  res.send("결과 출력");
});
//패턴 변수처리
app.get("/users/:id", (req, res) => {
  console.log(req.params);
  res.send(`사용자 ${req.params.id}를 출력한다.`);
});
app.get("/users/:id/profile", (req, res) => {
  console.log(req.params);
  res.send(`사용자 ${req.params.id}의 프로필을 출력}`);
});
//쿼리 파라미터
app.get("/search", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);
  res.send(`검색 요청 내용은 ${queryParams.q}와 top은 ${queryParams.top}`);
});
//서버시작
app.listen(port, () => {
  console.log("서버 준비됨");
});
