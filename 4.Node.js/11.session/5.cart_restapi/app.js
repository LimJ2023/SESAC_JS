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
function checkLogin(req, res, next) {
  const user = req.session.user;
  if (user) {
    next();
  } else {
    res.status(401).json({ message: "로그인 필요" });
  }
}

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
app.get("/api/cart", (req, res) => {
  res.json({ cart: req.session.cart });
});

app.post("/api/cart/:productId", checkLogin, (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find((pro) => pro.id === productId);

  if (!product) {
    return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }
  const cart = req.session.cart || [];
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  });

  req.session.cart = cart;
  res.json({ message: "장바구니 담기 성공" });
});
app.put("/api/cart/:productId", checkLogin, (req, res) => {
  const productId = parseInt(req.params.productId);
  const change = parseInt(req.query.change);
  console.log("번호 : ", productId, "어떻게 : ", change);

  const cart = req.session.cart || [];
  const item = cart.find((i) => i.id === productId);
  if (!item) {
    return res.status(404).json({ message: "상품 찾을 수 없음" });
  }
  item.quantity = Math.max(1, item.quantity + change);

  req.session.cart = cart;

  res.json({ message: "수량변경 성공" });
});

app.delete("/api/cart/:productId", checkLogin, (req, res) => {
  const productId = parseInt(req.params.productId);

  let cart = req.session.cart || [];
  const itemIndex = cart.findIndex((i) => i.id === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }

  cart = cart.filter((_, index) => index !== itemIndex);
  req.session.cart = cart;

  res.json({ message: "상품 삭제 완료", cart });
});
// res api들 <--
app.listen(port, (req, res) => {
  console.log(`server is running on http://localhost:${port}`);
});
