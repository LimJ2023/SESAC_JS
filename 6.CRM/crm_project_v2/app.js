require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const app = express();
const port = 3000;

//라우트
const pageRoutes = require("./routes/pages");
const userRoute = require("./routes/api/userRoute");
const storeRoute = require("./routes/api/storeRoute");
const orderRoute = require("./routes/api/orderRoute");
const itemRoute = require("./routes/api/itemRoute");
const orderItemRoute = require("./routes/api/orderItemRoute");

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키.
    resave: false, // 세션 데이터가 변경되지 않았어도 자동저장 할것인가.
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할것인가?
  })
);

// 라우트
// 사용자 페이지 라우트
app.use("/", pageRoutes);
// api 호출용 라우트
app.use("/api", userRoute);
app.use("/api", storeRoute);
app.use("/api", orderRoute);
app.use("/api", itemRoute);
app.use("/api", orderItemRoute);

// 로그인
app.post("/login", (req, res) => {
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
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
