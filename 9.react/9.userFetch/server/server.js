const express = require("express");
const app = express();
var cors = require("cors");
const morgan = require("morgan");

const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 20,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    age: 40,
  },
];

// 미들웨어
app.use(express.json());
// app.use(cors()); //해결은 되지만 보안 최악
app.use(
  cors({
    origin: "http://localhost:3000", //3000에서 온 요청은 허용!
  })
);
app.use(morgan("dev")); // 개발자 디버깅

// 라우트
app.get("/api/users", (req, res) => {
  // /api/users 전체를 요청할 땐 id,name만 전달해주기
  const filterdUsers = users.map((user) => {
    return { id: user.id, name: user.name };
  });
  res.json(filterdUsers);
});
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ error: true, message: "user not found" });
  }

  res.json(user);
});
app.listen(3001, () => {
  console.log("서버 레디");
});
