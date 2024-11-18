const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 변수
const db = new sqlite3.Database("user-sample.db");

// 미들웨어
app.use(express.static("public"));

// 라우트
// 사용자 페이지 라우트
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
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
app.get("/api/users/:id", (req, res) => {
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
app.listen(3000, () => {
  console.log("서버 레디");
});
