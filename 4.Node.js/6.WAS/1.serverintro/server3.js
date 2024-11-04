const http = require("http");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");

function readFilePromise(filePath) {
  return new Promise((resolve, rejects) => {
    try {
      const data = fs.readFileSync(filePath);
      resolve(data);
    } catch (error) {
      rejects(error);
    }
  });
}
http
  .createServer(async (req, res) => {
    //항상 예외처리, 오류가 날 수 있음을 유의.
    try {
      const data = await readFilePromise("./index.html");
      res.write(data);
    } catch (error) {
      console.error("index.html 읽는 도중 문제 발생");
      res.writeHead(500, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(`<h1>서버 에러 발생입니다. 관리자에게 문의하세요</h1> ${error.message}`);
    }
  })
  .listen(3000, () => {
    console.log("서버 대기중... 3000번 포트");
  });
