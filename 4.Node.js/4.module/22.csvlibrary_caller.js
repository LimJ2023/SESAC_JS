const { csvRead, csvWrite } = require("./21.csvliibrary");

const filePath = "hello1.txt";
const sampleData = [
  ["이름", "나이", "직업"],
  ["홍길동", "30", "개발자"],
  ["김철수", "25", "디자이너"],
  ["이영희", "28", "기획자"],
];

csvWrite(filePath, sampleData, (err) => {
  if (err) {
    console.log("파일 쓰기 실패", err.message);
  }
});

csvRead(filePath, (err, data) => {
  if (err) {
    console.log("파일 읽기 실패", err.message);
  }
  console.log("파일 내의 결과는 ", data);
});
