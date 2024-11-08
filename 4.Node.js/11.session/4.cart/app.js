const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키.
    resave: false, // 세션 데이터가 변경되지 않았어도 자동저장 할것인가.
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할것인가?
  })
);

//상품 db
const products = [
  {
    id: 1,
    name: "바나나",
    price: "2000",
  },
  {
    id: 2,
    name: "사과",
    price: "3000",
  },
  {
    id: 3,
    name: "오렌지",
    price: "1500",
  },
];
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  const id = req.query.id;
  const cart = req.session.cart || [];
  const product = products.find((e) => e.id == id);
  if (product) {
    req.session.cart = [...cart, product];
    console.log("세션에 저장된 목록 : ", req.session.cart);
    res.json(req.session.cart);
  } else {
    res.status(404).json({ message: "잘못된 상품 번호 입니다." });
  }
});
app.listen(3000, () => {
  console.log("서버 레디");
});
