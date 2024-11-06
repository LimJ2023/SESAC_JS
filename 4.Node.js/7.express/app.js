const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});
app.get("/user", (req, res) => {
  res.send("<h1>여기는 사용자 페이지입니다.</h1>");
});
app.get("/admin", (req, res) => {
  res.send("<h1>여기는 관리자 페이지입니다.</h1>");
});
app.post("/", (req, res) => {
  res.send("POST 요청이 /로 왔음");
});
app.post("/user", (req, res) => {
  res.send("POST 요청이 /user로 왔음");
});
app.put("/user", (req, res) => {
  res.send("PUT요청 /user로 들어옴");
});
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}번 포트에서 열려있습니다.`);
});
