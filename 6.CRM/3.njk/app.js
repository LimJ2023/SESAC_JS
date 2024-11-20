require("dotenv").config();
const express = require("express");
const app = express();
const sqlite3 = require("better-sqlite3");
const path = require("path");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const debug = require("debug");

// 변수
const debugS = new debug("myapp:server");
const debugR = new debug("myapp:request");
const debugDEV = new debug("myapp:DEV");
const isDebugMode = process.env.DEBUG === "true";
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
const db = new sqlite3("user-sample.db");
app.use(
  morgan("combined", {
    stream: logStream,
  })
);
app.use(morgan("dev"));
// combined - 아파치 서버 로그 포맷
// common - 요약
// dev - 개발시 유용
// 미들웨어
app.use(express.static("public"));

if (isDebugMode) {
  debugS("Running on dev mode. Debugging is enabled");
  app.use(morgan("dev"));
} else {
  debugS("Running on production mode. Debugging is disabled");
  app.use(morgan("common"));
}
// 라우트
// 사용자 페이지 라우트
app.get("/", (req, res) => {
  //아무 페이지값도 전달하지 않았을 땐 curPage가 1
  const limit = 10;
  const curPage = Number(req.query.page) || 1;
  const offset = (curPage - 1) * limit;
  const query = `SELECT * FROM users LIMIT @limit OFFSET @offset;`;
  const stmt = db.prepare(query);
  const data = stmt.all({ limit, offset });

  //전체페이지
  const totalQuery = `SELECT COUNT(*) as count FROM users`;
  const totalData = db.prepare(totalQuery).get();
  const total = Math.ceil(Number(totalData.count) / limit);
  const pageRange = 4;
  //어떻게하면 배열로 1,2,3,4,5,6 ... last - 3, last - 2, last - 1, ...이쁘게 전달해줄 수 있을까?
  const totalArr = [];
  for (let i = 1; i <= total; i++) {
    //이 중에 조건 맞는 애만 푸시
    if (i === 1 || i === 2 || i === 3) {
      totalArr.push(i);
    } else if (i === total - 2 || i === total - 1 || i === total) {
      totalArr.push(i);
    }
    // 페이지 기준 앞뒤로 4개 페이지 들어감
    else if (i >= curPage - pageRange && i <= curPage + pageRange) {
      totalArr.push(i);
    } else {
      // 아니라면
      if (totalArr[totalArr.length - 1] === "...") {
        continue;
      } else {
        totalArr.push("...");
      }
    }
  }
  console.log("totlaarry: ", totalArr);
  res.render("users.html", {
    data: data,
    page: curPage,
    total: total,
    totalArr: totalArr,
  });
});
app.get("/users/:id", (req, res) => {
  debugR("리퀘스트 디버그 1");
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;
  const stmt = db.prepare(query);
  const data = stmt.get([userId]);
  res.render("user_detail.html", { data });
});

app.get("/error", (req, res) => {
  const error = new Error("This is a test error");
  if (isDebugMode) {
    console.log(`DEBUG ERROR  ${error}`);
    res.status(500).send("Internal Error");
  } else {
    res.status(500).send("Internal Error");
  }
});
// api 호출용 라우트
// app.get("/api/users", (req, res) => {
//   const query = `SELECT * FROM users`;
//   db.all(query, (err, rows) => {
//     if (err) {
//       res.status(404).send("회원 목록 조회중 오류 발생");
//       return;
//     }
//     res.json(rows);
//   });
// });
// app.get("/api/users/:id", (req, res) => {
//   const userId = req.params.id;
//   const query = `SELECT * FROM users WHERE id = ?`;
//   db.get(query, [userId], (err, row) => {
//     if (err) {
//       res.status(404).json({ message: "회원 조회 중 오류 발생" });
//       return;
//     }
//     res.json(row);
//   });
// });

app.listen(3000, () => {
  console.log("서버 레디");
});
