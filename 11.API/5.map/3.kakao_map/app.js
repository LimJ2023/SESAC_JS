const express = require("express");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("서버 레디");
});
