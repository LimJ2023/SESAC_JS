require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

// 변수
const app = express();
const PORT = 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;
// 미들웨어
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 라우트
// app.get("/api/", (req, res) => {});

app.get("/search", async (req, res) => {
  const result = [];
  if (!API_KEY) {
    console.log("유튜브 api 키는 필수입니다.");
    process.exit(1); // 종료
  }
  const url = "https://www.googleapis.com/youtube/v3/search";
  const params = {
    part: "snippet",
    q: req.query.q,
    type: "video",
    maxResults: 10,
    key: API_KEY,
  };
  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    data.items.forEach((item) => {
      const title = item.snippet.title; // 영상제목
      const videoId = item.id.videoId;
      const link = `https://www.youbube.com/watch?v=${videoId}`; // 만든 rul
      const description = item.snippet.description;
      const thumbnail = item.snippet.thumbnails.high;

      result.push({
        title,
        videoId,
        description,
        thumbnail,
        link,
      });
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("유튜브 요청 실패", error.message);
  }
});

app.listen(PORT, () => {
  console.log("서버 레디 on port : ", PORT);
});
