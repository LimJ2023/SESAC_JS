const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 3000;
const dbfile = "users.db";
const sqlite = require("better-sqlite3");

const db = new sqlite(dbfile);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function initializeDatabase() {
  const sql = fs.readFileSync("init_users.sql", "utf-8");
  const statements = sql.split(";");
  try {
    // sql이 실행되다가 중지되면 전부 캔슬시키는 transaction. 이걸 사용하면 라인바이라인으로 읽음
    db.transaction(() => {
      for (const statement of statements) {
        db.exec(statement);
      }
    })();
  } catch {
    console.log("초기화 오류");
  }
}
initializeDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  try {
    const user = db.prepare(query).get(username, password);

    if (!user) {
      return res.status(404).send("사용자 없음");
    }
    res.json(user);
  } catch (error) {
    console.log("로그인 중 오류 발생", error.message);
    res.status(500).send("로그인 중 오류 발생");
  }
});

app.listen(port, () => {
  console.log("서버 레디");
});
