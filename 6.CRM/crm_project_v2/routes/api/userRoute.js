require("dotenv").config();
const express = require("express");
const sqlite3 = require("better-sqlite3");
const router = express.Router();
const paging = require("../../util");

const db = new sqlite3("db-sample.db");
const LIMIT = Number(process.env.LIMIT);

router.post("/users/", (req, res) => {
  try {
    const { name, gender } = req.query;
    const queryParams = [];
    const countparams = [];
    const curPage = Number(req.params.page) || 1;
    const offset = (curPage - 1) * LIMIT;

    let query = `SELECT * FROM users WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM users WHERE 1=1`;

    if (name) {
      query += ` AND name = ?`;
      countQuery += ` AND name = ?`;
      queryParams.push(name);
      countparams.push(name);
    }
    if (gender) {
      query += ` AND gender = ?`;
      countQuery += ` AND gender = ?`;
      queryParams.push(gender);
      countparams.push(gender);
    }

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(LIMIT);
    queryParams.push(offset);

    const stmt = db.prepare(query);
    const data = stmt.all(queryParams);
    //전체페이지
    const totalArr = paging(curPage, countQuery, countparams);
    console.log(totalArr, "total ARR");
    res.json({
      data: data,
      page: curPage,
      totalArr: totalArr,
      name: name,
      gender: gender,
    });
  } catch (error) {
    console.log("/users/ 에서 오류 발생", error.message);
    res.status(500).json({ error: "사용자 검색 중 오류 발생" });
  }
});
router.get("/users/:page", (req, res) => {
  try {
    const { name, gender } = req.query;
    const queryParams = [];
    const countparams = [];
    const curPage = Number(req.params.page) || 1;
    const offset = (curPage - 1) * LIMIT;

    let query = `SELECT * FROM users WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM users WHERE 1=1`;

    if (name) {
      query += ` AND name = ?`;
      countQuery += ` AND name = ?`;
      queryParams.push(name);
      countparams.push(name);
    }
    if (gender) {
      query += ` AND gender = ?`;
      countQuery += ` AND name = ?`;
      queryParams.push(gender);
      countparams.push(gender);
    }

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(LIMIT);
    queryParams.push(offset);

    const stmt = db.prepare(query);
    const data = stmt.all(queryParams);

    const totalArr = paging(curPage, countQuery, countparams);
    res.json({
      data: data,
      page: curPage,
      totalArr: totalArr,
      name: name,
      gender: gender,
    });
  } catch (error) {
    console.log("/users/:page 에서 오류 발생", error.message);
    res.status(500).json({ error: "유저 목록을 불러오는 중 오류 발생" });
  }
});
router.get("/user/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE id = ?`;
    const stmt = db.prepare(query);
    const user = stmt.get(userId);
    // 주문 정보 구하기 -- orderId와 날짜, 매장 정보를 출력
    const orderQuery = `
      SELECT o.id as orderId, o.OrdersAt, s.id as storeId, s.Name
      FROM orders o
      JOIN stores s ON s.id = o.StoreId
      JOIN users u ON u.id = o.UserId
      WHERE u.id = ?;`;
    const orderStmt = db.prepare(orderQuery);
    const orders = orderStmt.all(userId);

    // 매장 방문수 구하기
    const visitQuery = `SELECT (s.type ||' '|| s.name) as name, COUNT(*) AS visitCount
    FROM users u
    JOIN orders o ON o.UserId = u.id
    JOIN stores s ON s.id = o.StoreId
    WHERE u.id = ?
    GROUP BY s.id
    ORDER BY COUNT(*) DESC
    LIMIT 5;`;
    const visitStmt = db.prepare(visitQuery);
    const visitRanking = visitStmt.all(userId);

    // 물품 주문수 구하기
    const purchaseQuery = `SELECT i.name, COUNT(*) as purchaseCount
      FROM users u
      JOIN orders o ON o.UserId = u.id
      JOIN orderitem oi on oi.OrderId = o.id
      JOIN items i ON i.id = oi.ItemId
      WHERE u.id = ?
      GROUP BY i.name
      ORDER BY COUNT(*) DESC
      LIMIT 5;`;
    const purchaseStmt = db.prepare(purchaseQuery);
    const purchaseRanking = purchaseStmt.all(userId);

    res.json({
      user: user,
      orders: orders,
      visitRanking: visitRanking,
      purchaseRanking: purchaseRanking,
    });
  } catch (error) {
    console.log("/user/:id 에서 오류 발생", error.message);
    res.status(500).json({ error: "유저 정보를 불러오는 중 오류 발생" });
  }
});
module.exports = router;
