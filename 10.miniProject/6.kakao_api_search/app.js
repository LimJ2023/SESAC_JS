const axios = require("axios");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const webSearchUrl = "https://dapi.kakao.com/v2/search/web";
const videoSearchUrl = "https://dapi.kakao.com/v2/search/vclip";
const imageSearchUrl = "https://dapi.kakao.com/v2/search/image";
const headers = {
  Authorization: `KakaoAK ${REST_API_KEY}`,
};

app.use(express.json());
app.use(cors());

async function searching(query, url, page) {
  const params = {
    query: query, // 필수
    sort: "accuracy", //옵셔널
    page: page,
    size: 10,
  };

  try {
    const response = await axios.get(url, { headers, params });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error.message);
    return { error: true, message: "오류발생" };
  }
}

app.get("/webSearch", async (req, res) => {
  const query = req.query.q;
  const page = req.query.p;
  const url = UrlByType(req.query.type);
  console.log("서버가 받은 정보 : ", query, page, req.query.type);
  const data = await searching(query, url, page);

  res.json(data);
});

function UrlByType(type) {
  if (type === "web") {
    return "https://dapi.kakao.com/v2/search/web";
  } else if (type === "image") {
    return "https://dapi.kakao.com/v2/search/image";
  } else if (type === "video") {
    return "https://dapi.kakao.com/v2/search/vclip";
  } else {
    return null;
  }
}
app.listen(3000, (req, res) => {
  console.log("서버 레디 on ", 3000);
});
