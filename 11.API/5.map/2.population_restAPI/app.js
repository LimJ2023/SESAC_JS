const express = require("express");
const { getSeoulPopulationData } = require("./data");
const path = require("path");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/api/population", (req, res) => {
  const seoulData = getSeoulPopulationData();
  res.json(seoulData);
});
app.listen(3000, () => {
  console.log("서버 레디");
});
