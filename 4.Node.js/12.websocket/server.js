const Websocket = require("ws");
const port = 8000;

const wss = new Websocket.Server({ port: port });

wss.on("listening", () => {
  console.log("웹소켓 레디");
});

wss.on("connection", (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log("접속한 클라이언트 : ", clientIp);

  ws.on("message", (message) => {
    const messageString = message.toString("utf8");
    console.log(`${clientIp}로부터 받은 메세지 : ${messageString}`);

    wss.clients.forEach((client) => {
      // 현재 연결이 맺어져있는 소켓들
      if (client.readyState === Websocket.OPEN) {
        client.send(
          JSON.stringify({ type: "server-chat", content: messageString })
        );
        console.log("서버가 응답 보냄");
      }
    });
  });
  ws.on("close", () => {
    console.log("접속 종료");
  });
});
