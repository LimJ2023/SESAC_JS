const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//바디파서 미들웨어가 body의 내용중 json을 처리해서 body라는 변수에 담아준다.
// app.use(bodyParser.json());
// 바디파서가 기본탑재된 express를 사용하면 바로 이 기능을 사용가능.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("루트");
});

// app.post("/submit", (req, res) => {
//   let data = "";
//   req.on("data", (chunk) => (data += chunk));
//   req.on("end", () => {
//     try {
//       const jsonData = JSON.parse(data);
//       res.json({ receivedData: jsonData });
//     } catch (error) {
//       res.status(400).json({ error: "잘못된 형식의 json을 보냈음" });
//     }
//   });
// });
app.post("/submit2", (req, res) => {
  const jsonData = req.body; //body-parser 미들웨어를 거친 데이터
  res.json({ receivedData: jsonData });
});

app.listen(port, () => {
  console.log("서버 레디");
});
