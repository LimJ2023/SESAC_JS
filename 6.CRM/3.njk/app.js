const express = require("express");
const app = express();
const sqlite3 = require("better-sqlite3");
const path = require("path");
const nunjucks = require("nunjucks");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
// 변수
const db = new sqlite3("user-sample.db");

// 미들웨어
app.use(express.static("public"));

// 라우트
// 사용자 페이지 라우트
app.get("/", (req, res) => {
  const curPage = req.query.page;
  const limit = 10;
  const offset = (curPage - 1) * limit;
  const query = `SELECT * FROM users LIMIT @limit OFFSET @offset`;
  const stmt = db.prepare(query);
  const data = stmt.all({
    limit,
    offset,
  });
  res.render("users.html", { data: data, page: curPage });
});
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;
  const stmt = db.prepare(query);
  const data = stmt.get([userId]);
  res.render("user_detail.html", { data });
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
