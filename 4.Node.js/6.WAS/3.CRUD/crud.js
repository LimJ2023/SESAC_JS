const http = require("http");
const fs = require("fs").promises;
const path = require("path");
let users = [];
const filePath = "./static/";
http
  .createServer((req, res) => {
    console.log(req.method, req.url);
    if (req.method === "GET") {
      handleGetRequest(req, res);
    } else if (req.method === "POST") {
      handlePOSTRequest(req, res);
    } else if (req.method === "PUT") {
      handlePUTRequest(req, res);
    } else if (req.method === "DELETE") {
      handleDELETERequest(req, res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
    // res.end("처리 완료");
  })
  .listen(3000, () => {
    console.log("3000번 포트에서 서버 작동중.");
  });

async function handleGetRequest(req, res) {
  try {
    if (req.url === "/") {
      const data = await fs.readFile("./index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } else if (req.url === "/about") {
      const data = await fs.readFile("./about.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } else if (req.url === "/user") {
      console.log(users);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(users));
    } else if (req.url === "/user.js") {
      res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
      const script = await fs.readFile("./static/user.js", {
        encoding: "utf8",
      });
      res.end(script);
    } else if (req.url.startsWith("/image/")) {
      const imageName = path.basename(req.url);
      const imagePath = path.join("static/image/", imageName);
      const data = await fs.readFile(imagePath);
      res.writeHead(200, { "Content-Type": "image/jpg; charset=utf-8" });
      res.end(data);
    } else if (req.url.startsWith("/static")) {
      const filePath = path.join(__dirname, req.url);
      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end("알 수 없는 오류");
  }
}
function handlePOSTRequest(req, res) {
  if (req.url === "/user") {
    let body = "";
    req.on("data", (data) => (body += data));
    //data작업이 끝난 뒤 호출
    req.on("end", () => {
      if (req.headers["content-type"] === "text/plain") {
        res.end("plaintext로 데이터를 줬습니다.");
      } else if (req.headers["content-type"] === "application/json") {
        const parseData = JSON.parse(body);
        const user = {};
        console.log(
          "유저중복확인 : ",
          users.map((user) => user.id === parseData.id),
          isUserContaions(parseData.id, users)
        );
        if (!isUserContaions(parseData.id, users)) {
          user.id = parseData.id;
          user.name = parseData.name;
          users.push(user);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "이 아이디의 유저가 이미 존재합니다.",
            })
          );
        }
      } else {
        res.writeHead(404);
        res.end("모르는 타입입니다.");
      }
    });
  }
}

function isUserContaions(reqId, users) {
  let isContain = false;
  users.forEach((user) => {
    if (user.id === reqId) {
      isContain = true;
    }
  });
  return isContain;
}

function handlePUTRequest(req, res) {
  if (req.url === "/user") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      if (req.headers["content-type"] === "application/json") {
        const reqUser = JSON.parse(body);

        if (isUserContaions(reqUser.id, users)) {
          users.forEach((user) => {
            if (user.id === reqUser.id) {
              user.name = reqUser.inputName;
            }
          });
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          const resUser = { id: reqUser.id, name: reqUser.inputName };
          res.end(JSON.stringify(resUser));
        } else {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(reqUser.id + " 아이디의 유저는 존재하지 않습니다.");
        }
      }
    });
  }
}
function handleDELETERequest(req, res) {
  if (req.url === "/user") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const userId = body;
      let isuserContaions = users.map((user) => user.id === userId);
      console.log(
        "delete id : ",
        users.map((user) => user.id === userId)
      );
      if (isuserContaions) {
        const filteredUsers = users.filter((user) => user.id !== userId);
        console.log("필터링 된 유저목록 : ", filteredUsers);
        users = filteredUsers;
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        const result = JSON.stringify({
          id: userId,
          message: "유저 삭제 완료",
        });
        res.end(result);
      } else {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(userId + " 아이디의 유저는 존재하지 않습니다.");
      }
    });
    // res.end("DELETE요청 응답 완료");
  }
}
