const fs = require("fs");

//파일 읽기
//동기화 처리
try {
  fs.readFileSync("example2.txt", "utf-8");
} catch (error) {
  console.log("파일을 읽는 중 실패", error.message);
}

//파일 쓰기
const content = "이것이 파일에 쓰여질 내용입니다. 222";
fs.writeFileSync("newFile2.txt", content);

console.log("쓰기 완료");
