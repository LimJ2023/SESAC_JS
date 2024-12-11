const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
});
const code = "1037073";
const mailOptions = {
  from: process.env.NAVER_EMAIL,
  to: "heuristic2022@gmail.com",
  subject: "테스트이메일",
  text: `안녕하세요 테스트이메일 1 2 3 다음 코드를 입력하세요 ${code}`,
};

// 메일 발송
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log("이메일 전송 성공 ", info.response);
  }
});
