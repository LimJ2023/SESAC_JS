const express = require("express");
const path = require("path");
const router = express.Router();
const sqlite3 = require("better-sqlite3");

const app = express();
const db = new sqlite3("db-sample.db");

app.use(express.json());

router.post("/login", (req, res) => {
  const isLogin = req.session.isLogin || false;
  const { email, password } = req.body;
  if (!isLogin) {
    const loginQuery = `SELECT * FROM admin WHERE email = ? AND password = ?;`;
    const stmt = db.prepare(loginQuery);
    const data = stmt.get([email, password]);
    console.log("로그인 정보", data);
    if (!data) {
      req.session.isLogin = false;
      res
        .status(401)
        .json({ isLogin: false, message: "이메일이나 비밀번호가 옳지 않음" });
    } else {
      req.session.isLogin = true;
      res.json({ isLogin: true, message: "로그인 성공" });
    }
  }
});

module.exports = router;
