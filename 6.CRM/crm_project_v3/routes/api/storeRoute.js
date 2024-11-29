require("dotenv").config();
const express = require("express");
const sqlite3 = require("better-sqlite3");
const router = express.Router();
const paging = require("../../util");

const db = new sqlite3("db-sample.db");
const LIMIT = Number(process.env.LIMIT);

router.get("/stores/:page", (req, res) => {
  try {
    const curPage = Number(req.params.page) || 1;
    const offset = (curPage - 1) * LIMIT;
    const queryParams = [];
    const countparams = [];

    let query = `SELECT * FROM stores WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM stores WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(LIMIT);
    queryParams.push(offset);

    //아무 페이지값도 전달하지 않았을 땐 curPage가 1
    const stmt = db.prepare(query);
    const data = stmt.all(queryParams);
    //전체페이지
    const totalArr = paging(curPage, countQuery, countparams);
    res.json({
      data: data,
      page: curPage,
      totalArr: totalArr,
    });
  } catch (error) {
    console.log("/stores/:page 에서 오류 발생", error.message);
    res.status(500).json({ error: "상점 목록을 불러오는 중 오류 발생" });
  }
});

router.get("/store/:id", (req, res) => {
  try {
    const storeId = req.params.id;
    const month = req.query.rev_month;

    const query = `SELECT * FROM stores WHERE id = ?`;
    const stmt = db.prepare(query);
    const store = stmt.get(storeId);

    //단골 손님
    const freQuery = `SELECT o.userId, u.name, count(*) as frequency
      FROM stores s
      JOIN orders o ON o.StoreId = s.id
      JOIN users u ON u.id = o.UserId
      WHERE s.id = ?
      GROUP BY o.userId, u.name
      HAVING count(*) > 1
      ORDER BY frequency DESC
      LIMIT 10;`;
    const freStmt = db.prepare(freQuery);
    const frequency = freStmt.all(storeId);
    if (month) {
      // 일간 매출 구하기
      const revenueQuery = `SELECT STRFTIME('%Y-%m-%d',o.OrdersAt) AS day, 
          SUM(i.UnitPrice) as revenue, COUNT(o.id) as count
        FROM orders o
        JOIN orderitem oi ON oi.OrderId = o.Id
        JOIN items i ON i.Id = oi.ItemId
        JOIN stores s ON o.StoreId = s.Id
        WHERE s.id = ?
          AND STRFTIME('%Y-%m',o.OrdersAt) IN (?)
          AND STRFTIME('%Y-%m-%d',o.OrdersAt) IS NOT NULL
        GROUP BY STRFTIME('%Y-%m-%d',o.OrdersAt)
        ORDER BY STRFTIME('%Y-%m-%d',o.OrdersAt) ASC;`;
      const revenueStmt = db.prepare(revenueQuery);
      const revenue = revenueStmt.all(storeId, month);
      res.json({ store: store, frequency: frequency, revenue: revenue });
    } else {
      //  월간 매출 구하기
      //  잘못된 날짜가 들어가 있으면 NULL값이 나옴 예) 24:30분  2월 30일 등...
      const revenueQuery = `
        SELECT STRFTIME('%Y-%m',o.OrdersAt) AS month, 
          SUM(i.UnitPrice) as revenue, COUNT(o.id) as count
        FROM orders o
        JOIN orderitem oi ON oi.OrderId = o.Id
        JOIN items i ON i.Id = oi.ItemId
        JOIN stores s ON o.StoreId = s.Id
        WHERE s.id = ?
          AND STRFTIME('%Y-%m',o.OrdersAt) IS NOT NULL
        GROUP BY STRFTIME('%Y-%m',o.OrdersAt)
        ORDER BY STRFTIME('%Y-%m',o.OrdersAt) ASC;`;
      const revenueStmt = db.prepare(revenueQuery);
      const revenue = revenueStmt.all(storeId);
      res.json({ store: store, frequency: frequency, revenue: revenue });
    }
  } catch (error) {
    console.log("/sotre/:id 에서 오류 발생", error.message);
    res.status(500).json({ error: "상점 정보를 불러오는 중 오류 발생" });
  }
});
module.exports = router;
