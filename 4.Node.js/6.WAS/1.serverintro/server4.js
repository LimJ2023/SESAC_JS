const { readFile, readFileSync, readSync } = require("fs");
const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    //항상 예외처리, 오류가 날 수 있음을 유의.
    try {
      const data = await fs.readFile("./index.html");
      res.end(data);
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
