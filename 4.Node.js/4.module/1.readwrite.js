const fs = require("fs");

//파일 읽기
fs.readFile("example.txt", "utf-8", (err, data) => {
  //동기화 처리
  // fs.readFileSync("example.txt")
  if (err) {
    console.log("파일 읽기 실패");
  } else {
    console.log("파일 내용 : ", data);
  }
});

//파일 쓰기
const content = "이것이 파일에 쓰여질 내용입니다.";
fs.writeFile("newFile2.txt", content, "utf-8", (err) => {
  console.log("파일 쓰기 실패", err);
});
