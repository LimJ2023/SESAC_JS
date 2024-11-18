const express = require("express");
const { search, resultTotal } = require("./dbSQL");
const fs = require("fs");
const path = require("path");
const port = 3000;
const limit = 10;
const app = express();

app.use(express.urlencoded({ extended: true }));
//불필요한 미들웨어였음
// app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

app.get("/search", (req, res) => {
  try {
    const query = req.query.searchQuery;
    const scope = req.query.searchScope;
    const page = Number(req.query.page);
    const results = search(query, scope, page, limit);
    const totalPages = resultTotal(query, scope, limit);
    res.json({
      seccess: true,
      results: results,
      pages: {
        total: totalPages,
        page: page,
      },
    });
  } catch (error) {
    console.log(req.query.searchScope + " 조회 중 오류", error);
    res.status(500).json({
      seccess: false,
      message: req.query.searchScope + " 조회 중 오류",
    });
  }
});

app.listen(port, () => {
  console.log("서버 레디");
});
