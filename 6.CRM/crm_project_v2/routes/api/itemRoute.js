require("dotenv").config();
const express = require("express");
const sqlite3 = require("better-sqlite3");
const router = express.Router();
const paging = require("../../util");

const db = new sqlite3("db-sample.db");
const LIMIT = Number(process.env.LIMIT);

router.get("/items/:page", (req, res) => {
  const curPage = Number(req.params.page) || 1;
  const offset = (curPage - 1) * LIMIT;
  const queryParams = [];
  const countparams = [];

  let query = `SELECT * FROM items WHERE 1=1`;
  let countQuery = `SELECT count(*) as count FROM items WHERE 1=1`;

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
});
router.get("/item/:id", (req, res) => {
  const itemId = req.params.id;
  // 주문의 상품 목록 구하기 -- 주문의 상품 목록 구하기
  const query = `
        SELECT name, UnitPrice
        FROM items
        WHERE id = ?;`;
  const stmt = db.prepare(query);
  const item = stmt.get(itemId);

  const revenueQuery = `SELECT STRFTIME('%Y-%m',o.OrdersAt) AS month,SUM(i.UnitPrice) as revenue, COUNT(*) as count
        FROM items i
        JOIN orderitem oi ON oi.ItemId = i.id
        JOIN orders o ON o.id = oi.OrderId
        WHERE i.id = ?
        AND STRFTIME('%Y-%m-%d',o.OrdersAt) IS NOT NULL
        GROUP BY STRFTIME('%Y-%m',o.OrdersAt);`;
  const revenueStmt = db.prepare(revenueQuery);
  const revenue = revenueStmt.all(itemId);
  res.json({ item: item, revenue: revenue });
});

module.exports = router;
