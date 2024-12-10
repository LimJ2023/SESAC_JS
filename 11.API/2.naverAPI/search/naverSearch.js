// 네이버 검색 API 예제 - 블로그 검색
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

app.use(cors());
app.get("/search/blog", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/blog?query=" +
    encodeURI(req.query.query); // JSON 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!"
  );
});
