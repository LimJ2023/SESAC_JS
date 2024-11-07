// npm i ejs   익스프레스의 플러그인같은 것.
const express = require("express");
const app = express();
const port = 3000;
// express의 뷰엔진은 ejs를 쓰겠다.
app.set("view engine", "ejs");

// <%= 변수명 %>
// <%# 주석 %>
// <% 로직... %>
app.get("/", (req, res) => {
  res.render("index", { title: "익스프레스 웹", message: "웰컴 투 EJS" });
});
app.get("/fruits", (req, res) => {
  const fruits = ["Apple", "Banana", "Orange", "Grapes"];
  res.render("fruits", { fruits: fruits });
});
app.get("/greeting", (req, res) => {
  const userName = "yohan";
  res.render("greeting", { userName });
});
app.get("/welcome", (req, res) => {
  const isAdmin = false;
  res.render("welcome", { isAdmin });
});
app.listen(port, () => {
  console.log("서버 레디");
});
