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
    introduction: "안녕하세요",
  },
  {
    id: 2,
    username: "user2",
    password: "pass2",
    introduction: "안녕하세요2 난 2번 유저",
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
  // res.sendFile(path.join(__dirname, "public", "login.html"));
  if (req.session.user) {
    const { username } = req.session.user;
    res.render("index2", { username: username, title: "Welcome" });
  } else {
    res.render("index2", { username: "손님", title: "Welcome" });
  }
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const user = users.find(
    (e) => e.username === username && e.password === password
  );
  console.log(user);
  if (user) {
    // 어째서 html파일을 줬는데 페이지가 바뀌지 않는걸까?
    // res.sendFile(path.join(__dirname, "public", "welcome.html"));

    req.session.user = user;
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
  const user = req.session.user;
  if (user) {
    res.render("profile", {
      username: user.username,
      introduction: user.introduction,
    });
  } else {
    res.status(401).json({ message: "인증되지 않은 사용자입니다." });
  }
});

// 로그아웃
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("index2", { username: "손님", title: "Welcome" });
});
app.listen(port, () => {
  console.log("서버 레디");
});

//CHECK LOGIN

app.get("/check-login", (req, res) => {
  req.session.touch();
  const user = req.session.user;
  const isLogin = user ? true : false;
  if (isLogin) {
    res.json({ isLogin });
  } else {
    res.status(401).send("로그인되지 않음");
  }
});
