const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = 3000;

// 미들웨어
app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키.
    resave: false, // 세션 데이터가 변경되지 않았어도 자동저장 할것인가.
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할것인가?
  })
);
app.use(express.json());
app.use(express.static("public"));
// 상품 정보
const users = [
  { id: 1, username: "user1", password: "pass1" },
  { id: 2, username: "user2", password: "pass2" },
  { id: 3, username: "user3", password: "pass3" },
];

const products = [
  { id: 1, name: "상품1", price: 2000 },
  { id: 2, name: "상품2", price: 3000 },
  { id: 3, name: "상품3", price: 4000 },
];

// 메인 라우트
app.get("/", (req, res) => {
  const user = req.session.user;
  //미들웨어에서 먼저 html파일을 정해버려서..
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cart.html"));
});
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products.html"));
});
// 메인라우트 <--

// rest api들 -->
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username == username && user.password == password
  );
  if (user) {
    req.session.user = user; // 로그인 성공시 세션에 그 유저를 저장해둠
    req.session.save();
    res.json({ message: "로그인 성공", username: user.username });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});
app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "로그아웃 실패" });
    } else {
      res.json({ message: "로그아웃 성공", redirectUrl: "/" });
    }
  });
});
app.get("/api/check-login", (req, res) => {
  console.log("세션에 저장된 유저 : ", req.session.user);
  const user = req.session.user;

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/cart", (req, res) => {});
app.post("/api/cart", (req, res) => {});
app.put("/api/cart", (req, res) => {});
app.delete("/api/cart", (req, res) => {});
// res api들 <--
app.listen(port, (req, res) => {
  console.log(`server is running on http://localhost:${port}`);
});
