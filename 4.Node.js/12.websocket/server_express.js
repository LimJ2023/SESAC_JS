const express = require("express");
const expressWs = require("express-ws");
const path = require("path");
const app = express();
const port = 8000;
expressWs(app);

// 나에게 접속하는 사용자들을 관리할 자료구조
const wsClients = new Map();
const chatRooms = new Map();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat-client.html"));
});

// 웹소켓을 처리하는 ep
app.ws("/chat", (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log("클라이언트 ip : ", clientIp);

  ws.on("message", (message) => {
    const messageString = message.toString("utf8");
    console.log("받은 메세지 : ", messageString);
    const parsedMessage = JSON.parse(messageString);
    const userName = parsedMessage.userName;
    const content = parsedMessage.content;
    const roomId = parsedMessage.roomId;

    if (userName && !wsClients.has(userName)) {
      wsClients.set(userName, ws); // 새로운 사용자면 목록에 추가
      chatRooms.set(userName, roomId);
      console.log(
        `새로운 사용자 접속 : ${chatRooms.get(userName)} 방, ${userName}님`
      );
    }
    if (parsedMessage.type !== "session") {
      wsClients.forEach((client, id) => {
        if (
          client.readyState === ws.OPEN &&
          //룸아이디가 같은 유저들에게 전송하는 방법...
          chatRooms.get(id) === chatRooms.get(userName)
        ) {
          const messageResponse = {
            type: "response",
            content: content,
            userName: userName,
            roomId: roomId,
          };
          client.send(JSON.stringify(messageResponse));
        }
      });
    } else if (parsedMessage.type === "session") {
      wsClients.forEach((client, id) => {
        if (
          client.readyState === ws.OPEN &&
          //룸아이디가 같은 유저들에게 전송하는 방법...
          chatRooms.get(id) === chatRooms.get(userName)
        ) {
          const messageResponse = {
            type: "session",
            userName: userName,
          };
          client.send(JSON.stringify(messageResponse));
        }
      });
    }
    // ws.send(messageString);
  });
  // 접속이 끊겼을 때
  ws.on("close", () => {
    console.log("사용자 접속 종료");
    let username = "";
    wsClients.forEach((client, id) => {
      if (client === ws) {
        wsClients.delete(id);
        username = id;
      }
    });

    wsClients.forEach((client, id) => {
      if (client.readyState === ws.OPEN) {
        const messageResponse = {
          type: "close",
          userName: username,
          content: `${username}님이 퇴장하였습니다.`,
        };
        client.send(JSON.stringify(messageResponse));
      }
    });
  });
});
app.listen(port, () => {
  console.log("서버 레디");
});
