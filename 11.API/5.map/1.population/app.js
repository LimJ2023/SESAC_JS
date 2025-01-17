const express = require("express");
const nunjucks = require("nunjucks");
const { getSeoulPopulationData } = require("./data");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  const seoulData = getSeoulPopulationData();
  res.render("population", { data: JSON.stringify(seoulData) });
});

app.listen(3000, () => {
  console.log("서버 레디");
});
