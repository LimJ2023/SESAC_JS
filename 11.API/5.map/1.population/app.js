const express = require("express");
const nunjucks = require("nunjucks");
const { getSeoulPopulationData } = require("./data");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

app.get("/", (req, res) => {
  const seoulData = getSeoulPopulationData();
  res.render("population", { seoulData: JSON.stringify(seoulData) });
});

app.listen(3000, () => {
  console.log("서버 레디");
});
