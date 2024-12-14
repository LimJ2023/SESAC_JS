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

let db = [];
const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup2.html"));
});
app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "welcome.html"));
});

app.post("/signup", (req, res) => {
  const email = req.body.email;
  let verifyCode = generateVerificationCode();
  console.log("인증코드 : ", verifyCode);

  const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: email,
    subject: "회원가입 인증 코드",
    text: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #4CAF50;">서비스 가입을 환영합니다!</h2>
            <p>아래의 5자리 코드를 입력하여 인증을 완료해주세요:</p>
            <h1 style="color: #333; letter-spacing: 5px;">${verifyCode}</h1>
            <p>이 요청을 본인이 하지 않았다면, 이 메일을 무시하세요.</p>
        </div>`,
  };
  // 메일 발송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("이메일 전송 성공 ", info.response);
      const compareEmail = db.find((item) => item.email === email);
      // 이미 이메일을 발송한 경우
      if (compareEmail) {
        db = db.map((item) => {
          if (item.email === email) {
            item.code = verifyCode;
          }
          return item;
        });
      } else {
        // 처음이면 이메일을 db에 저장
        db.push({
          email: email,
          code: verifyCode,
        });
      }
      res.json({ success: true, message: "인증코드 발송 완료" });
    }
  });
});
app.post("/verify", (req, res) => {
  const { email, code } = req.body;

  console.log("이메일,코드", email, code);

  // 여기서 받은 값과 db값 비교하여 응답 주기
  const compareEmail = db.find((item) => item.email === email);
  if (compareEmail) {
    if (compareEmail.code === code) {
      res.json({ success: true, message: "인증 완료" });
    } else {
      res.status(400).json({ success: false, message: "인증 실패" });
    }
  } else {
    res.status(400).json({ success: false, message: "인증 실패" });
  }
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
