const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");

// app.use(express.urlencoded({ extended: true }));
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
    price: 2000,
    url: "/image/banana.jpg",
  },
  {
    id: 2,
    name: "애플",
    price: 317335,
    url: "/image/apple.jpg",
  },
  {
    id: 3,
    name: "귤",
    price: 1500,
    url: "/image/orange.jpg",
  },
  {
    id: 4,
    name: "사과",
    price: 3000,
    url: "/image/apple2.jpg",
  },
];

//목록 불러오기
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/cart", (req, res) => {
  req.session.cart = req.session.cart || [];
  req.session.total = 0;
  req.session.cart.forEach((pro) => {
    req.session.total += Number(pro.price) * Number(pro.quantity);
  });
  res.json({
    products: req.session.cart,
    total: req.session.total.toLocaleString(),
  });
});

// 물품 추가
app.post("/cart", (req, res) => {
  const id = req.query.id;

  // 주문한 물품이 상품목록에 있는 것인지 확인
  const product = products.find((e) => e.id == id);
  req.session.cart = req.session.cart || [];
  console.log("수량더한 카트 : ", req.session.cart);
  if (product) {
    // 카트에 같은 내용물이 있다면 quantity를 +1;
    // 카트에서 quantity를 알아내는 방법?
    if (
      req.session.cart.length === 0 ||
      !req.session.cart.find((e) => e.id == id)
    ) {
      product.quantity = 1;
      req.session.cart.push(product);
    } else {
      req.session.cart.forEach((pro) => {
        if (pro.id == id) {
          pro.quantity = ++pro.quantity;
        }
      });
    }
    req.session.total = 0;
    req.session.cart.forEach((pro) => {
      req.session.total += Number(pro.price) * Number(pro.quantity);
    });
    req.session.save();
    res.json({
      products: req.session.cart,
      total: req.session.total.toLocaleString(),
    });
  } else {
    res.status(404).json({ message: "잘못된 상품 번호 입니다." });
  }
});

// 수량 변경
app.patch("/quantity", (req, res) => {
  const reqId = req.body.id;
  const reqCount = req.body.count;
  req.session.cart.forEach((pro) => {
    if (pro.id == reqId) {
      pro.quantity = reqCount;
      req.session.total = 0;
      req.session.cart.forEach((pro) => {
        req.session.total += Number(pro.price) * Number(pro.quantity);
      });
    }
  });
  console.log("수량변경후 ", req.session.cart);

  //세션이 저장되지 않아서 생긴 문제였음(다른 fetch에선 수량이 제대로 업데이트 되지 않던 문제)
  req.session.save();
  res.json({ total: req.session.total.toLocaleString() });
});

// 삭제
app.delete("/delete", (req, res) => {
  const id = req.query.id;
  req.session.cart.splice(
    0,
    req.session.cart.length,
    ...req.session.cart.filter((pro) => pro.id != id)
  );
  req.session.total = 0;
  req.session.cart.forEach((pro) => {
    req.session.total += Number(pro.price) * Number(pro.quantity);
  });
  req.session.save();
  res.json({
    products: req.session.cart,
    total: req.session.total.toLocaleString(),
  });
});
app.listen(3000, () => {
  console.log("서버 레디");
});
