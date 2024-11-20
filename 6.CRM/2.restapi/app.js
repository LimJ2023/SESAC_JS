const express = require("express");
const morgan = require("morgan");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const port = 3000;
const fs = require("fs");
// 변수
const db = new sqlite3.Database("user-sample.db");
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
// 미들웨어
app.use(express.static("public"));
app.use(express.json());
app.use(
  morgan("combined", {
    stream: logStream,
  })
);
app.use(morgan("dev"));
// combined - 아파치 서버 로그 포맷
// common - 요약
// dev - 개발시 유용

// 라우트
// 사용자 페이지 라우트
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
});
app.get("/user/:id", (req, res) => {
  res.sendFile(path.resolve("public/user_detail.html"));
});
// api 호출용 라우트
app.get("/api/users", (req, res) => {
  const query = `SELECT * FROM users`;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(404).send("회원 목록 조회중 오류 발생");
      return;
    }
    res.json(rows);
  });
});

app.get("/api/user/:id", (req, res) => {
  console.log("api유저번호 호출");
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      res.status(404).json({ message: "회원 조회 중 오류 발생" });
      return;
    }
    res.json(row);
  });
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
