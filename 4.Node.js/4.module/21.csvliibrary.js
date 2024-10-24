const fs = require("fs");
function csvRead(filePath, callback) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) console.error("파일읽는도중 오류 " + err.message);

    const rows = data.split("\n");

    const result = rows.map((row) => row.split(","));
    callback(err, result);
  });
}
function csvWrite(filePath, csvContent, callback) {
  //전달된 컨텐츠 String으로 변환해준다.
  const result = csvContent
    .map((row) => {
      return row.join(",");
    })
    .join("\n");

  fs.writeFile(filePath, result, (err) => {
    if (err) {
      console.error("파일 쓰는도중 오류.", err.message);
      callback(err);
      return;
    }
    console.log("쓰기 완료");
    callback(null);
  });
}

module.exports = { csvRead, csvWrite };
