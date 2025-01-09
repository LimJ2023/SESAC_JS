const express = require("express");
const morgan = require("morgan");

// 가상 데이터
const data = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}`);
const app = express();

function getRandomIncrement() {
  return Math.floor(Math.random() * 21); // 0~20까지
}
const intervalId = setInterval(() => {
  if (data.length < maxItemCount) {
    const randomIncrement = getRandomIncrement();
    const currentLength = data.length;
    for (let i = 0; i < randomIncrement; i++) {
      if (data.length < maxItemCount) {
        data.push(`Item ${currentLength + i + 1}`);
      }
    }
    console.log(
      `10초 경과 : 데이터가 ${randomIncrement}개 추가되어 총 ${data.length}개가 됨`
    );
  } else {
    clearInterval(intervalId);
    console.log(`최대 개수 ${maxItemCount}에 도달하여 생성하지 않음`);
  }
}, 10_000); //10초

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/api/data", (req, res) => {
  const { start, end } = req.query;

  const items = getItems(parseInt(start), parseInt(end));

  res.json(items);
});

function getItems(start, end) {
  //   console.log("스크롤됨 ,", data.slice(start, end));
  return data.slice(start, end);
}
app.listen(3000, () => {
  console.log("서버 레디");
});
