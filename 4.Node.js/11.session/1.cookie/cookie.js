const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.headers);
  res.writeHead(200, { "set-cookie": "mycookie=test" });
  res.end("end");
});

server.listen(3000, () => {
  console.log("서버 레디");
});
