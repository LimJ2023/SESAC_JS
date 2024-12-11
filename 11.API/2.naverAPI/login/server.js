require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const request = require("request");
const morgan = require("morgan");

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;
const REDIRECT_URL = "http://localhost:3000/callback";

const naver_auth_url = "https://nid.naver.com/oauth2.0/authorize";
const naver_token_url = "https://nid.naver.com/oauth2.0/token";
// 사용자 정보 조회 (access 토큰 기반으로 정보를 더 요청할 수 있음)
const naver_userinfo_url = "https://openapi.naver.com/v1/nid/me";
let captchaKey;
// 미들웨어
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
// app.use(checkLogin);
app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키.
    resave: false, // 세션 데이터가 변경되지 않았어도 자동저장 할것인가.
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할것인가?
  })
);

function checkLogin(req, res, next) {
  if (req.session?.user) {
    return next();
  } else {
    res.redirect("/");
  }
}

// 라우트
app.get("/login", (req, res) => {
  // 네이버로 가라고 한다.
  const state = Math.random().toString(36).substring(6); //랜덤 글자(0-9a-z)
  const authURL = `${naver_auth_url}?response_type=code&client_id=${client_id}&redirect_url=${REDIRECT_URL}&state=${state}`;
  const captcha = req.session.captcha || false;
  if (captcha) {
    req.session.destroy();
    res.redirect(authURL);
  } else {
    // captcha 결과 없으면 캡챠로 ㄱㄱ
    res.redirect("/captcha");
  }
});
app.get("/captcha", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "captcha.html"));
});
app.get("/callback", async (req, res) => {
  // 인증 끝나고 돌아왔다. token 검증하고 할 일을 한다.
  const { code, state } = req.query;
  const tokenResponse = await axios.get(naver_token_url, {
    params: {
      grant_type: "authorization_code",
      client_id: client_id,
      client_secret: client_secret,
      redirect_url: REDIRECT_URL,
      code: code,
      state: state,
    },
  });

  // 최종적으로 부여받은 이 사용자용 accessToken
  const accessToken = tokenResponse.data.access_token;

  // 사용자 정보를 조회하고 싶다면?
  const userInfoResponse = await axios.get(naver_userinfo_url, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 일반적인 규칙임
    },
  });
  const userInfo = userInfoResponse.data.response;

  const additionalUserInfo = {
    nickname: userInfo.nickname || "미동의",
    email: userInfo.email || "미동의",
    gender: userInfo.gender || "미동의",
    age: userInfo.age || "미동의",
    birthyear: userInfo.birthyear || "미동의",
    birthday: userInfo.birthday || "미동의",
  };
  req.session.user = additionalUserInfo;
  res.redirect("/dashboard");
});
app.get("/dashboard", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/api/user", (req, res) => {
  const user = req.session.user || null;
  if (!user) {
    res.json({ error: true, message: "없는 사용자입니다." });
  } else {
    //사용자 정보 반납
    res.json(user);
  }
});
app.get("/logout", (req, res) => {
  //세션 삭제
  req.session.destroy();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 이미지 캡챠 키 발급
app.get("/captcha/nkey", function (req, res) {
  const api_url = "https://openapi.naver.com/v1/captcha/nkey?code=0";
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const parsedBody = JSON.parse(body); // JSON 파싱
      const key = parsedBody.key;
      captchaKey = key;
      console.log("캡챠 키 발급 성공:", captchaKey);

      // 이미지 요청
      const imageApiUrl = `https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=${key}`;
      const imageOptions = {
        url: imageApiUrl,
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
      };

      request.get(imageOptions).on("response", function (response) {
        const contentType = response.headers["content-type"];
        if (contentType && contentType.startsWith("image/")) {
          res.writeHead(200, { "Content-Type": contentType });
          response.pipe(res);
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          response.pipe(res);
        }
      });
    } else {
      res.status(response.statusCode).send("캡챠 키 발급 실패");
      console.error("Error:", response.statusCode, error);
    }
  });
});
// 캡챠 검증
app.get("/captcha/result", function (req, res) {
  var api_url = `
    https://openapi.naver.com/v1/captcha/nkey?code=1&key=${req.query.key}&value=${req.query.value}"
  `;

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
      const captchaResult = JSON.parse(body);
      console.log("캡챠 결과 :", captchaResult);
      // 세션에 캡차 결과 저장
      req.session.captchaResult = captchaResult;
      if (captchaResult.result) {
        res.redirect("/login");
      } else {
        res.redirect("/");
      }
      //   res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.get("/captcha/key", (req, res) => {
  res.json({ key: captchaKey });
});
app.listen(3000, function () {
  console.log("http://localhost:3000/login app listening on port 3000!");
});
