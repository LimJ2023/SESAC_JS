require("dotenv").config();
const express = require("express");
const sqlite3 = require("better-sqlite3");
const router = express.Router();
const paging = require("../../util");

const db = new sqlite3("db-sample.db");
const LIMIT = Number(process.env.LIMIT);

router.get("/orders/:page", (req, res) => {
  try {
    const curPage = Number(req.params.page) || 1;
    const offset = (curPage - 1) * LIMIT;
    const queryParams = [];
    const countparams = [];

    let query = `SELECT * FROM orders WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM orders WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(LIMIT);
    queryParams.push(offset);

    //아무 페이지값도 전달하지 않았을 땐 curPage가 1
    const stmt = db.prepare(query);
    const data = stmt.all(queryParams);
    //전체페이지
    const totalArr = paging(curPage, countQuery, countparams);
    console.log(totalArr, "total ARR");
    res.json({
      data: data,
      page: curPage,
      totalArr: totalArr,
    });
  } catch (error) {
    console.log("/orders/:page 에서 오류 발생", error.message);
    res.status(500).json({ error: "주문 목록을 불러오는 중 오류 발생" });
  }
});
router.get("/order/:id", (req, res) => {
  try {
    const orderId = req.params.id;
    // 주문의 상품 목록 구하기 -- 주문의 상품 목록 구하기
    const query = `
        SELECT oi.id, o.id as orderId, i.id as itemId, i.Name
        FROM orderitem oi
        JOIN orders o ON o.id = oi.OrderId
        JOIN items i ON i.id = oi.ItemId
        WHERE o.id = ?;`;
    const stmt = db.prepare(query);
    const orderItem = stmt.all(orderId);
    res.json({ orderItem: orderItem });
  } catch (error) {
    console.log("/order/:id 에서 오류 발생", error.message);
    res.json({ error: "주문 정보를 불러오는 중 오류 발생" });
  }
});
module.exports = router;
