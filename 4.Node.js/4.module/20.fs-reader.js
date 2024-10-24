const fs = require("fs");

const filePath = "hello.csv";

function csv_readfile(filePath, callback) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    //이건 stdin = 2 로 분류되는 에러겠다.
    if (err) console.error("파일읽는도중 오류 " + err.message);
    console.log(data);
    //csv에 저장된 문자는 그냥 문자열일 뿐..구분지을 수가 없다

    // console.log(rows);
    // for (let i = 0; i < rows.length; i++) {
    //   const row = rows[i];
    //   //   console.log(row);
    //   const columns = row.split(",");
    //   console.log(columns);
    // }
    const rows = data.split("\n");
    const result = rows.map((row) => row.split(","));
    callback(result);
  });
}
//csv = 콤마로 구별된 데이터 형식.
const content = [
  ["이름", "나이", "직업"],
  ["홍길동", "30", "개발자"],
  ["김철수", "25", "디자이너"],
  ["이영희", "28", "기획자"],
];
const csvContent = content
  .map((row) => {
    return row.join(",");
  })
  .join("\n");

function csv_writefile(filePath, csvContent) {
  fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
      console.error("파일 쓰는도중 오류.", err.message);
      return;
    }
    console.log("쓰기 완료");
  });
}
csv_writefile(filePath, csvContent);
// csv_readfile(filePath, (data) => {
//   console.log("csv파일 내용 : ", data);
// });
