const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키.
    resave: false, // 세션 데이터가 변경되지 않았어도 자동저장 할것인가.
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할것인가?
  })
);
function userCount(req, res, next) {
  //세션에 방문 카운트 변수가 있으면 재사용, 없으면 0으로 초기화.
  req.session.visitCount = req.session.visitCount || 0;
  req.session.visitCount++;
  console.log(
    `이 SessionID: ${req.sessionID}의 방문횟수 : ${req.session.visitCount}`
  );
  next();
}
app.use(userCount);
app.get("/", (req, res) => {
  req.session.username = "user1";
  req.session.cart = ["사과우유", "딸기우유", "바나나우유"];

  //세션에 저장했지만 자동으로 set-cookie를 통해 session ID가 전송됨.
  // express에서 정한 세션 id의 키가 connect.sid
  res.send("루트");
});

app.get("/readsession", (req, res) => {
  const username = req.session.username;
  const cart = req.session.cart;
  const visitCount = req.session.visitCount;
  if (username && cart) {
    res.send(
      `당신은 ${username}이고 장바구니는 ${cart}입니다.${visitCount}번 방문함`
    );
  } else {
    res.send("새로 오신 것을 환영합니다.");
  }
  console.log(`세션 아이디 : ${req.sessionID}`);
});
app.listen(port, () => {
  console.log("서버 레디");
});
