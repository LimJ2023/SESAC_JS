// npm i express nunjucks
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

app.set("view engine", "html");

nunjucks.configure("views", {
  autoescape: true, // 입력값 처리할 때 xss같은 것 발생하지 않도록 처리하는기능.
  express: app,
});

app.get("/", (req, res) => {
  //index 로 설정하면 set에 있는 확장자를 찾음. 명시해주면 index.html로 찾음
  res.render("index", {
    title: "익스프레스 웹",
    message: "웰컴 투 nunjucks",
  });
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
app.listen(3000, () => {
  console.log("서버 레디");
});
