const fs = require("fs"); //빌트인 함수를 먼저 불러오고
const csv = require("csv-parser"); //라이브러리를 후에 적는다.

const results = [];

fs.createReadStream("example.csv", "utf-8")
  .pipe(csv())
  .on("data", (data) => results.push(data)) // 스트림으로 읽으면서 처리
  .on("end", () => {
    console.log(results); //읽기가 끝났을 때의 처리.
  });
