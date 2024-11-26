const express = require("express");
const sqlite3 = require("sqlite3");
const nunjucks = require("nunjucks");
const app = express();
const port = 3000;

// 눈적스 초기화
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "html");
app.get("/", (req, res) => {
  const db = new sqlite3.Database("db-sample.db", (err) => {
    if (err) {
      console.log("파일없음");
    } else {
      console.log("db 로딩됨");
    }
  });

  db.all(
    `
    SELECT STRFTIME('%Y-%m',o.OrdersAt) AS month,SUM(i.UnitPrice) as revenue, COUNT(*) as count
    FROM items i
    JOIN orderitem oi ON oi.ItemId = i.id
    JOIN orders o ON o.id = oi.OrderId
    WHERE i.id = '2e5ca6e9-2b49-4fbd-9826-8673a95a6b9d'
    AND STRFTIME('%Y-%m-%d',o.OrdersAt) IS NOT NULL
    GROUP BY STRFTIME('%Y-%m',o.OrdersAt);
    `,
    [],
    (err, rows) => {
      if (err) {
        console.log("월간 데이터 가져오는 중 실패");
        res.send("실패!");
      } else {
        console.log("쿼리 실행 결과 : ", rows);
        const labels = rows.map((e) => e.month);
        const charData = rows.map((e) => e.revenue);
        const counts = rows.map((e) => e.count);
        res.render("monthly_revenue", {
          rows: rows,
          charData: JSON.stringify(charData),
          labels: JSON.stringify(labels),
          counts: JSON.stringify(counts),
        });
      }
    }
  );
  db.close((err) => {
    if (err) {
      console.error("db닫기 실패", err.message);
    } else {
      console.log("db 닫음");
    }
  });
});
app.listen(port, (req, res) => {
  console.log("server is running on ", port);
});
