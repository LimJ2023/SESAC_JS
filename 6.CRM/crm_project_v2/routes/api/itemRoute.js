require("dotenv").config();
const express = require("express");
const sqlite3 = require("better-sqlite3");
const router = express.Router();
const paging = require("../../util");

const db = new sqlite3("db-sample.db");
const LIMIT = Number(process.env.LIMIT);

router.get("/items/:page", (req, res) => {
  try {
    const curPage = Number(req.params.page) || 1;
    const offset = (curPage - 1) * LIMIT;
    const queryParams = [];
    const countparams = [];

    let query = `SELECT * FROM items WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM items WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(LIMIT);
    queryParams.push(offset);

    const stmt = db.prepare(query);
    const data = stmt.all(queryParams);

    const totalArr = paging(curPage, countQuery, countparams);
    console.log(totalArr, "total ARR");

    res.json({
      data: data,
      page: curPage,
      totalArr: totalArr,
    });
  } catch (error) {
    console.error("Error in GET /items/:page:", error.message);
    res.status(500).json({ error: "An error occurred while fetching items." });
  }
});

router.get("/item/:id", (req, res) => {
  try {
    const itemId = req.params.id;

    const query = `
        SELECT name, UnitPrice
        FROM items
        WHERE id = ?;`;
    const stmt = db.prepare(query);
    const item = stmt.get(itemId);

    const revenueQuery = `SELECT STRFTIME('%Y-%m',o.OrdersAt) AS month, SUM(i.UnitPrice) as revenue, COUNT(*) as count
        FROM items i
        JOIN orderitem oi ON oi.ItemId = i.id
        JOIN orders o ON o.id = oi.OrderId
        WHERE i.id = ?
        AND STRFTIME('%Y-%m-%d',o.OrdersAt) IS NOT NULL
        GROUP BY STRFTIME('%Y-%m',o.OrdersAt);`;
    const revenueStmt = db.prepare(revenueQuery);
    const revenue = revenueStmt.all(itemId);

    res.json({ item: item, revenue: revenue });
  } catch (error) {
    console.error("Error in GET /item/:id:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the item." });
  }
});

module.exports = router;
