const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs").promises;
const path = require("path");
//내가 정한 폴더명을 기본으로 설정
app.use(express.static("public"));

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "public", "index.html");

  try {
    const htmlFile = fs.readFile(htmlFilePath);
    res.send(htmlFile);
  } catch (error) {
    res.status(500).send("서버오류");
  }
});

//이런 파일처리를 해주는 라이브러리
app.get("/sendfile", (req, res) => {
  const htmlFilePath = path.join(__dirname, "public", "index.html");
  // res.sendFile(htmlFilePath);

  res.sendFile(htmlFilePath, (err) => {
    if (err) {
      res.status(500).send("서버 오류");
    }
  });
});

//마지막에 처리하는 미들웨어.
app.use((req, res) => {
  res.status(404).send("없음!!");
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: "서버 내부 오류." });
});
app.listen(port, () => {
  console.log("서버 레디");
});
