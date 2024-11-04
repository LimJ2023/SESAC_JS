const http = require("http");

//같은 코드.
// const server = http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html; charset=utf-8",
//     });
//     res.end("<p>잘가</p>");
//   })
//   .listen(5000, () => {
//     console.log("서버 대기중... 5000번 포트");
//   });

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end("<p>잘가</p>");
  })
  .listen(5000, () => {
    console.log("서버 대기중... 5000번 포트");
  });
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end("<p>잘가</p>");
  })
  .listen(4000, () => {
    console.log("서버 대기중... 4000번 포트");
  });
// server.on("request", (req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "text/html; charset=utf-8",
//   });
//   res.end("<p>잘가</p>");
// });
