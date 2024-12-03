const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.listen(3000, () => {
  console.log("서버 레디");
});
