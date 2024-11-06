// 외부 모듈 정의
const express = require("express");
const fs = require("fs");
const path = require("path");
const users = [];
// 변수 정의
const app = express();
const PORT = 3000;

//미들웨어
app.use(express.json());
app.use("/static", express.static("static"));
app.use("/image", express.static("static/image"));
//라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.post("/user", (req, res) => {
  const { name } = req.body;
  const user = { id: name, name: name };
  users.push(user);
  res.status(201).send("등록 성공!");
});
app.put("/user", (req, res) => {});
app.delete("/user", (req, res) => {});
app.get("*", (req, res) => {
  res.send("없는 페이지입니다.");
});
// 오류 미들웨어

//서버 시작
app.listen(PORT, () => {
  console.log("서버 레디");
});
