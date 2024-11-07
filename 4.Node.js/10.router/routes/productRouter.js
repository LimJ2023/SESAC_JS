const express = require("express");
const router = express.Router();

router.get("/list", (req, res) => {
  res.send("상품 목록 출력");
});

router.get("details", (req, res) => {
  res.send("상품 상세 목록");
});

router.get("/:id/details", (req, res) => {
  const id = req.params.id;
  res.send("상품 개별 : " + id);
});

module.exports = router;
