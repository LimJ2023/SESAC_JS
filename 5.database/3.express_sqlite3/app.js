const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const port = 3000;
const dbfile = "mydb.db";

const app = express();
const db = new sqlite3.Database(dbfile);

app.use(express.urlencoded({ extended: true }));

function initializeDatabase() {
  const sql = fs.readFileSync("initSQL.sql", "utf-8");

  db.exec(sql, (err) => {
    if (err) {
      if (err.errno === 19) {
        console.log("초기화 중 이미 테이블에 데이터가 들어있음. 초기화 실패");
      } else {
        console.log("초기화 오류", err.message);
      }
    } else {
      console.log("초기화 성공");
    }
  });
}
initializeDatabase();

app.post("/users", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) {
        console.log("유저 삽입 중 에러", err.message);
        return res.status(500).send("서버 내부 오류");
      }
      res.send(`사용자 추가 완료 ${this.lastID}`);
    }
  );
});

app.get("/:table", (req, res) => {
  const db_table = req.params.table;
  const query = `SELECT * FROM ${db_table}`;

  db.all(query, (err, rows) => {
    if (err) {
      res.send("db 조회 오류");
      return;
    }
    if (!rows) {
      return res.status(404).send(`Invalid `);
    }
    res.json(rows);
  });
});

app.put("/users/:id", (req, res) => {
  // 사용자 정보를 바꾸려면 어떻게 해야할까?
  const id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const fields = [];
  const values = [];
  if (username !== undefined) {
    fields.push("username = ?");
    values.push(username);
  }
  if (password !== undefined) {
    fields.push("password = ?");
    values.push(password);
  }
  if (fields.length === 0) {
    return res.status(400).send("변경할 필드가 없다.");
  }
  db.run(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
    (err) => {
      if (err) {
        res.status(500).send("수정 중 오류");
      } else {
        res.send(`사용자 수정 완료 : ${id}`);
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("내부 오류");
    }
    res.send(`사용자 삭제 완료 ${userId}`);
  });
});
app.get("/:table/:id", (req, res) => {
  const db_table = req.params.table;
  const id = req.params.id;
  const query = `SELECT * FROM ${db_table} WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      res.send("db 조회 오류");
      return;
    }
    if (!row) {
      return res.status(404).send(`Invalid id : ${id}`);
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log("서버 레디 온 ", port);
});
