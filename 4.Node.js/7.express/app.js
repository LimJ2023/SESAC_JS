const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}번 포트에서 열려있습니다.`);
});
