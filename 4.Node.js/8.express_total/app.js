// 외부 모듈 정의
const express = require("express");
const fs = require("fs");
const path = require("path");
const { message } = require("statuses");
const users = [];
// 변수 정의
const app = express();
const PORT = 3000;

//미들웨어
app.use(express.json()); // application/json이 있으면 req.body에 담아달라.
app.use("/static", express.static("static"));
app.use("/image", express.static("static/image"));
app.use((req, _, next) => {
  console.log(`LOG : ${req.method}, ${req.url}`);
  next();
});
//라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "about.html"));
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.post("/user", (req, res) => {
  const { name } = req.body;
  const user = { id: name, name: name };
  if (!isUserContaions(user.id, users)) {
    users.push(user);
    console.log("유저 목록 : ", users);
    res.status(201).json({ id: user.id, name: user.name });
  } else {
    res.status(400).json({ message: "해당 아이디의 유저가 이미 존재합니다.." });
  }
});
//edit
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const userInputName = req.query.input;

  const { inputName } = req.body;

  if (isUserContaions(userId, users)) {
    users.forEach((user) => {
      if (user.id === userId) {
        user.name = userInputName;
      }
    });
    res.status(200).json({ id: userId, name: userInputName });
  } else {
    res.status(400).send("해당 아이디의 유저는 존재하지 않습니다.");
  }
});
// delete
app.delete("/user/:id", (req, res) => {
  const userid = req.params.id;
  // 객체 안의 요소를 키값으로 찾아 지우는 법
  // delete users[id];
  if (isUserContaions(userid, users)) {
    users.splice(
      0,
      users.length,
      ...users.filter((user) => user.id !== userid)
    );
    res.status(200).json({ id: userid, message: "삭제 완료" });
  } else {
    res.status(400).send("해당 아이디의 유저는 존재하지 않습니다.");
  }
});
// 오류 미들웨어
// 전체 공통 404페이지
app.use((req, res) => {
  const errorPage = path.join(__dirname, "static", "notFound.html");
  res.status(404).sendFile(errorPage);
});
app.use((req, res) => {
  res.status(500).json({ message: "서버 내부 오류." });
});
//서버 시작
app.listen(PORT, () => {
  console.log("서버 레디");
});

function isUserContaions(reqId, users) {
  let isContain = false;
  users.forEach((user) => {
    if (user.id === reqId) {
      isContain = true;
    }
  });
  return isContain;
}
