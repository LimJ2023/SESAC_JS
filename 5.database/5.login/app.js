const express = require("express");
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

//세션 초기화
app.use(
  session({
    secret: "secret-1234",
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({
      db: "sessions.db", // db 파일명
    }),
  })
);
//내부 변수
const app = express();
const port = 3000;
const dbfile = "users.db";
const db = new sqlite3.Database(dbfile);

function initializeDatabase() {
  const sql = fs.readFileSync("init_users.sql", "utf-8");

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

//세션 초기화
app.use(
  session({
    secret: "my-scret-1234",
    resave: false,
    saveUninitialized: true,
  })
);
//미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//라우팅
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});
app.get("/profile-data", (req, res) => {
  console.log("세션 데이터 진입 ", req.session.user);
  if (!req.session.user) {
    res.status(404).send("세션에 저장된 유저 없음");
  }
  res.json(req.session.user);
});
app.get("/profile", (req, res) => {
  res.sendFile(path.resolve("public/profile.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const rediectionUrl = "/profile";
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.log("로그인 실패 : ", err.message);
    } else {
      if (!row) {
        res.status(401).json("아이디나 비밀번호가 옳지 않음");
      } else {
        console.log("로그인 성공", row);
        req.session.user = req.session.user || {};
        req.session.user = row;
        res.json({
          username: row.username,
          email: row.email,
          created_at: row.created_at,
          role: row.role,
          url: rediectionUrl,
        });
      }
    }
  });
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("로그아웃 실패");
    } else {
      res.send("로그아웃 성공");
    }
  });
});
app.listen(port, () => {
  console.log("서버 레디");
});
