const express = require("express");
const morgan = require("morgan");
const app = express();
const sqlite3 = require("better-sqlite3");
const path = require("path");
const port = 3000;
const fs = require("fs");
require("dotenv").config();
// 변수
const db = new sqlite3("user-sample.db");
const LIMIT = Number(process.env.LIMIT);
// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
// 라우트
// 사용자 페이지 라우트
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
});
app.get("/user/:id", (req, res) => {
  res.sendFile(path.resolve("public/user_detail.html"));
});
app.get("/users/", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
});
app.get("/users/:page", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
});
app.get("/store_detail/:id", (req, res) => {
  res.sendFile(path.resolve("public/store_detail.html"));
});
app.get("/stores/", (req, res) => {
  res.sendFile(path.resolve("public/store.html"));
});
app.get("/stores/:page", (req, res) => {
  res.sendFile(path.resolve("public/store.html"));
});
app.get("/items/", (req, res) => {
  res.sendFile(path.resolve("public/item.html"));
});
app.get("/items/:page", (req, res) => {
  res.sendFile(path.resolve("public/item.html"));
});
app.get("/orders/", (req, res) => {
  res.sendFile(path.resolve("public/order.html"));
});
app.get("/orders/:page", (req, res) => {
  res.sendFile(path.resolve("public/order.html"));
});
app.get("/orderItem/", (req, res) => {
  res.sendFile(path.resolve("public/orderItem.html"));
});
app.get("/orderItem/:page", (req, res) => {
  res.sendFile(path.resolve("public/orderItem.html"));
});

// api 호출용 라우트
app.get("/api/orderItem/:page", (req, res) => {
  const curPage = Number(req.params.page) || 1;
  const offset = (curPage - 1) * LIMIT;
  const queryParams = [];
  const countparams = [];

  let query = `SELECT * FROM orderitem WHERE 1=1`;
  let countQuery = `SELECT count(*) as count FROM orderitem WHERE 1=1`;

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
app.get("/api/orders/:page", (req, res) => {
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
});
app.get("/api/item/:page", (req, res) => {
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
app.get("/api/stores/:page", (req, res) => {
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
});
app.post("/api/users/", (req, res) => {
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

  //아무 페이지값도 전달하지 않았을 땐 curPage가 1
  const stmt = db.prepare(query);
  const data = stmt.all(queryParams);
  //어떻게하면 배열로 1,2,3,4,5,6 ... last - 3, last - 2, last - 1, ...이쁘게 전달해줄 수 있을까?
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
});
app.get("/api/users/:page", (req, res) => {
  console.log("페이지쪽 호출");
  const { name, gender } = req.query;
  console.log("이름성별 : ", name, gender);
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

  //아무 페이지값도 전달하지 않았을 땐 curPage가 1
  const stmt = db.prepare(query);
  const data = stmt.all(queryParams);
  //어떻게하면 배열로 1,2,3,4,5,6 ... last - 3, last - 2, last - 1, ...이쁘게 전달해줄 수 있을까?
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
});
app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;
  const stmt = db.prepare(query);
  const row = stmt.get(userId);
  res.json(row);
});

app.get("/api/store/:id", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

//페이징처리 함수
function paging(curPage, countQuery, params) {
  const totalData = db.prepare(countQuery).get(params);
  const total = Math.ceil(Number(totalData.count) / LIMIT);
  const pageRange = 3;
  const totalArr = [];
  let lastElement;
  for (let i = 1; i <= total; i++) {
    //이 중에 조건 맞는 애만 푸시
    if (i <= 3) {
      totalArr.push(i);
      lastElement = i;
    } else if (i >= total - 2) {
      totalArr.push(i);
      lastElement = i;
    }
    // 페이지 기준 앞뒤로 3개 페이지 들어감
    else if (i >= curPage - pageRange && i <= curPage + pageRange) {
      totalArr.push(i);
      lastElement = i;
    } else {
      if (lastElement !== "...") {
        totalArr.push("...");
        lastElement = "...";
      }
    }
  }
  return totalArr;
}
