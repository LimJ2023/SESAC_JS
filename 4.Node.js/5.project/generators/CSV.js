class CSVliibrary {
  constructor() {
    this.fs = require("fs");
    this.csv_parser = require("csv-parser");
  }

  csvRead(filePath) {
    this.fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) console.error("파일읽는도중 오류 " + err.message);

      const rows = data.split("\n");

      const result = rows.map((row) => row.split(","));
      return result;
    });
  }
  csvWrite(filePath, csvContent, head) {
    const header = head;
    //전달된 컨텐츠 String으로 변환해준다.
    const rows = csvContent.map((row) => {
      return row.join(",");
    });
    const result = [header, ...rows].join("\n");

    this.fs.writeFile(filePath, result, (err) => {
      if (err) {
        console.error("파일 쓰는도중 오류.", err.message);
        return;
      }
      console.log(filePath + " 쓰기 완료");
    });
  }

  csvConverter(fileName, data) {
    const filePath = fileName;
    csvWriter(filePath, data, (err) => {
      if (err) {
        console.log("파일 쓰기 실패", err.message);
      }
    });
  }

  csvParse(fileName) {
    return new Promise((resolve, rejects) => {
      const results = [];
      this.fs
        .createReadStream(fileName, "utf-8")
        .pipe(this.csv_parser())
        .on("data", (data) => results.push(data)) // 스트림으로 읽으면서 처리
        .on("end", () => {
          // console.log("csvParse 완료"); //읽기가 끝났을 때의 처리.
          resolve(results);
          // return results;
        })
        .on("error", (error) => {
          rejects(error);
        });
    });
  }
}

module.exports = CSVliibrary;
