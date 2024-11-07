// npm i express nunjucks
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

app.set("view engine", "html");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  const data = {
    title: "마이 페이지",
    content: "이것은 컨텐츠 페이지 입니다.",
  };
  res.render("main", data);
});
app.get("/user", (req, res) => {
  const data = {
    title: "유저 페이지",
    content: "이것은 유저의 컨텐츠 페이지 입니다.",
  };
  res.render("user", data);
});
app.get("/product", (req, res) => {
  const data = {
    title: "상품 페이지",
    content: "이것은 상품의 컨텐츠 페이지 입니다.",
  };
  res.render("product", data);
});
app.get("/page1", (req, res) => {
  const data = {
    title: "상속하는 스타일",
    content: "상속받은 page1의 컨텐츠 페이지.",
  };
  res.render("page1", data);
});
app.get("/page2", (req, res) => {
  const data = {
    title: "상속하는 스타일2",
    content: "상속받은 page2의 컨텐츠 페이지.",
  };
  res.render("page2", data);
});
app.listen(3000, () => {
  console.log("서버 레디");
});
