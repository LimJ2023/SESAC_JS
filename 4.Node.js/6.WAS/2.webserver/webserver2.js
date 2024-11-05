//사용자가 /를 요청하면 인덱스. /about을 요청하면 about을 전달. 나머지는 (404 not found)
// 이미지 폴더를 요청하면 STATIC 폴더안에 있는 파일을 전달..
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
let users = [];
// key value를 파싱
// const parse = require("querystring").parse;

//객체 디스트럭쳐링 객체 분해.
const { parse } = require("querystring");
http
  .createServer(async (req, res) => {
    console.log("method : ", req.method);

    try {
      // GET
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./index.html");
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.end(data);
        } else if (req.url.startsWith("/image/")) {
          const imageName = path.basename(req.url);
          const imagePath = path.join("static", imageName);
          const data = await fs.readFile(imagePath);
          res.writeHead(200, {
            "Content-Type": "image/jpg;",
          });
          console.log("파일 패스 : ", imagePath);
          res.write(data);
        } else if (req.url === "/user") {
          console.log("모든 유저 목록 : ", users);
          res.end();
        } else {
          res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.end("Not Found");
        }
        // POST
      } else if (req.method === "POST") {
        console.log("포스트 요청 진입");
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => {
            body += data;
            // console.log(`데이터가 받아지는 동안의 chunk: ${body}`);
          });

          req.on("end", () => {
            console.log(`데이터 다 받은 후.${body}`);
            const formData = parse(body);
            console.log("받은 데이터는? : ", formData);
            users.push({ name: formData.name });
            res.end();
          });
        } else {
          res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.end("Not Found");
        }
      } else if (req.method === "PUT") {
      }
      // delete
      else if (req.method === "DELETE") {
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          req.on("end", () => {
            const formData = parse(body);
            if (users.includes(formData)) {
              const filteredUsers = users.filter(
                (user) => user.name !== formData.name
              );
              console.log("필터링 된 유저목록 : ", filteredUsers);
              users = filteredUsers;
              res.end(formData.name + "유저 삭제 완료");
            } else {
              res.end(formData.name + "이름의 유저는 존재하지 않습니다.");
            }
          });
        }
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    } catch (error) {
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
      });
      console.log("페이지 찾을 수 없음 : ", error.message);
      res.end(
        `<h1>페이지 찾을 수 없음. 올바른 주소를 입력하세요 </h1>, ${error.message}`
      );
    }
  })
  .listen(3000, () => {
    console.log("서버 대기중... 3000번 포트");
  });
