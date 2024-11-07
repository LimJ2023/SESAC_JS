const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");
const path = require("path");
const app = express();
const port = 3000;
app.set("view engine", "html");

nunjucks.configure("views", {
  autoescape: true, // 입력값 처리할 때 xss같은 것 발생하지 않도록 처리하는기능.
  express: app,
});
const users = [
  {
    id: 1,
    username: "user1",
    password: "pass1",
  },
  {
    id: 2,
    username: "user2",
    password: "pass2",
  },
];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키.
    resave: false, // 세션 데이터가 변경되지 않았어도 자동저장 할것인가.
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할것인가?
  })
);
function userCount(req, res, next) {
  //세션에 방문 카운트 변수가 있으면 재사용, 없으면 0으로 초기화.
  req.session.visitCount = req.session.visitCount || 0;
  req.session.visitCount++;

  next();
}
app.use(userCount);
app.get("/login", (req, res) => {
  res.render("login2", { title: "Login Page" });
});
app.get("/", (req, res) => {
  if (req.session.user) {
    const { username } = req.session.user;
    res.render("index2", { username: username, title: "Welcome" });
  } else {
    res.render("index2", { username: "손님", title: "Welcome" });
  }
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //사용자가 입력한 id/pw를 users자료구조에서 검색....
  if (findUser(username, password)) {
    req.session.user = { username: username, password: password };
    res.render("index2", { username: username, title: "Welcome" });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});
app.get("/readsession", (req, res) => {
  const username = req.session.username;
  const cart = req.session.cart;
  const visitCount = req.session.visitCount;
});

app.get("/profile", (req, res) => {
  // const user = "세션에서 사용자 정보 가져오기"
  const user = req.session.user;
  if (user) {
    res.json({ username: user.username, message: "프로필 정보" });
  } else {
    res.status(401).json({ message: "인증되지 않은 사용자입니다." });
  }
});

// 로그아웃은 어떻게????
app.get("/logout", (req, res) => {
  //세션에서 사용자 정보를 삭제? 어떻게...
  req.session.destroy();
  res.status(200).json({ message: "로그아웃 성공" });
});
app.listen(port, () => {
  console.log("서버 레디");
});

function findUser(username, password) {
  let isFound = false;
  users.forEach((user) => {
    if (user.username === username && user.password === password) {
      isFound = true;
    }
  });
  return isFound;
}
