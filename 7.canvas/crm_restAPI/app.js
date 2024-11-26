const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const port = 3000;

const db = new sqlite3.Database("db-sample.db", (err) => {
  if (err) {
    console.log("파일없음");
  } else {
    console.log("db 로딩됨");
  }
});
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/revenue_data", (req, res) => {
  db.all(
    `
    SELECT STRFTIME('%Y-%m',o.OrdersAt) AS month,SUM(i.UnitPrice) as revenue, COUNT(*) as count
    FROM items i
    JOIN orderitem oi ON oi.ItemId = i.id
    JOIN orders o ON o.id = oi.OrderId
    WHERE STRFTIME('%Y-%m-%d',o.OrdersAt) IS NOT NULL
    GROUP BY STRFTIME('%Y-%m',o.OrdersAt);
    `,
    [],
    (err, rows) => {
      if (err) {
        console.log("월간 데이터 가져오는 중 실패");
        res.send("실패!");
      } else {
        const labels = rows.map((e) => e.month);
        const chartData = rows.map((e) => e.revenue);
        const counts = rows.map((e) => e.count);
        console.log("쿼리 실행 결과 : ", labels, chartData, counts);
        res.json({
          rows: rows,
          chartData: chartData,
          labels: labels,
          counts: counts,
        });
      }
    }
  );
});

app.get("/gender_dist_data", (req, res) => {
  // 연령대 별로 나눈 쿼리문
  db.all(
    `
  SELECT
    CASE
      WHEN age BETWEEN 10 AND 19 THEN '10대'
      WHEN age BETWEEN 20 AND 29 THEN '20대'
      WHEN age BETWEEN 30 AND 39 THEN '30대'
      WHEN age BETWEEN 40 AND 49 THEN '40대'
      WHEN age BETWEEN 50 AND 59 THEN '50대'
      WHEN age BETWEEN 60 AND 69 THEN '60대'
    END AS ageGroup,
    gender,
    COUNT(*) AS userCount
  FROM users
  GROUP BY ageGroup, gender;
    `,
    [],
    (err, rows) => {
      if (err) {
        console.log("월간 데이터 가져오는 중 실패");
        res.send("실패!");
      } else {
        // console.log("나이대성별", rows);
        const ageDist = rows.map((e) => e.ageGroup);
        const maleCount = rows
          .filter((e) => e.Gender === "남성")
          .map((e) => e.userCount);
        const femaleCount = rows
          .filter((e) => e.Gender === "여성")
          .map((e) => e.userCount);

        console.log(maleCount, femaleCount);
        res.json({
          ageDist,
          maleCount,
          femaleCount,
        });
      }
    }
  );
});
app.listen(port, (req, res) => {
  console.log("server is running on ", port);
});
