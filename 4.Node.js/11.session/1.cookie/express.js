const express = require("express");
const cookiParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookiParser());

app.get("/", (req, res) => {
  //클라이언트에게 쿠키를 보낸다.
  res.cookie("mycookie", "cooooookieee", { maxAge: 60000 }); // 60s. 1분.
  res.cookie("username", "user1", { maxAge: 60000 });
  res.cookie("cart", ["사과우유", "딸기우유", "바나나우유"], { maxAge: 60000 });

  res.send("쿠키를 담아서 보낸다.");
});
app.get("/readcookie", (req, res) => {
  const myCookie = req.cookies.mycookie;
  console.log(myCookie);
  res.send(`번호표를 잘 들고 왔군.${JSON.stringify(req.cookies)}`);
});
app.listen(port, () => {
  console.log("서버 레디");
});
