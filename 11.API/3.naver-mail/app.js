require("dotenv").config();
const axios = require("axios");
const express = require("express");
const morgan = require("morgan");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
const randomString = require("randomstring");
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());

const db = [];
const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const verifyCode = generateVerificationCode();
  console.log("인증코드 : ", verifyCode);

  const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: email,
    subject: "회원가입 인증 코드",
    text: `안녕하세요 1 2 3 다음 코드를 입력하세요 ${verifyCode}`,
  };
  // 메일 발송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("이메일 전송 성공 ", info.response);
      // db에 저장
      db.push({
        email: email,
        code: verifyCode,
      });
      res.json({ success: true });
    }
  });
});
app.post("/verify", (req, res) => {
  const { email, code } = req.body;

  console.log("이메일,코드", email, code);

  // 여기서 받은 값과 db값 비교하여 응답 주기
});
function generateVerificationCode() {
  return randomString.generate({
    length: 5,
    charset: ["numeric"],
  });
}

app.listen(3000, () => {
  console.log("서버 레디 on http://localhost:", 3000);
});
