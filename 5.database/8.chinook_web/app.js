//라이브러리
require("dotenv").config();
const { ok } = require("assert");
const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // 개발환경에서만 쓰기
const fs = require("fs");
const path = require("path");

//변수 저장
const port = 3000;
const app = express();
const db = new sqlite3.Database(process.env.DB_PATH);
const LIMIT = process.env.PAGE_LIMIT;

//미들웨어
app.use(express.static("public"));

//라우트
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/api/search", (req, res) => {
  const { searchQuery, page = 1 } = req.query;
  const modiQuery = "%" + searchQuery + "%";
  const offset = LIMIT * (page - 1);

  const countSql = `SELECT COUNT(*) as total FROM artists WHERE name LIKE ?;`;
  db.get(countSql, [`%${searchQuery}%`], (err, row) => {
    const total = row.total;
    const sql = "SELECT * FROM artists WHERE name LIKE ? LIMIT ? OFFSET ?";
    db.all(sql, [modiQuery, LIMIT, offset], (err, rows) => {
      if (err) {
        res.status(500).send("검색 도중 오류 발생");
        return;
      }

      res.json({
        results: rows,
        message: "검색 완료",
        pages: {
          total: total,
          page: page,
        },
      });
    });
  });
});
app.listen(port, () => {
  console.log("서버 레디");
});
