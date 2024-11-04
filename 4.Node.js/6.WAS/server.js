const http = require("http");

const server = http.createServer();

server.on("connection", () => {
  console.log("새로운 사용자가 접속합니다.");
});
server.listen(3000, () => {
  console.log("서버가 잘 시작되었습니다.");
  console.log("Server is running on http://localhost:3000");
});
