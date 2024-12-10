require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const nunjucks = require("nunjucks");

// 변수
const app = express();
const PORT = 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;
let results = [];
// 미들웨어
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "html");

// 라우트
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/search", async (req, res) => {
  // youtube에 검색하기 결과 반환
  results = await fetchYoutube(req.query.q);
  res.render("index", { results });
});

app.get("/play", (req, res) => {
  const videoId = req.query.videoId;
  const selectedVideo = results.find((v) => v.videoId === videoId);

  res.render("index", { results: results, selectedVideo: selectedVideo });
});

app.listen(PORT, () => {
  console.log("서버 레디 on port : ", PORT);
});

async function fetchChanellViewCount(id) {
  if (!API_KEY) {
    console.log("유튜브 api 키는 필수입니다.");
    process.exit(1); // 종료
  }
  const url = "https://www.googleapis.com/youtube/v3/videos";
  const params = {
    part: "statistics",
    id: id,
    key: API_KEY,
  };

  const response = await axios.get(url, { params });
  const data = response.data;
  const viewCount = data.items[0].statistics.viewCount;
  //   console.log("viewCount", data.items[0].statistics.viewCount);
  return viewCount;
}
async function fetchYoutube(q) {
  const result = [];
  const resultTable = [];
  if (!API_KEY) {
    console.log("유튜브 api 키는 필수입니다.");
    process.exit(1); // 종료
  }

  const url = "https://www.googleapis.com/youtube/v3/search";
  const params = {
    part: "snippet",
    q: q,
    type: "video",
    maxResults: 5,
    key: API_KEY,
  };
  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    for (const item of data.items) {
      const title = item.snippet.title; // 영상제목
      const videoId = item.id.videoId;
      const link = `https://www.youbube.com/watch?v=${videoId}`; // 만든 rul
      const description = item.snippet.description;
      const thumbnail = item.snippet.thumbnails.high;

      const viewCount = await fetchChanellViewCount(videoId);
      result.push({
        title,
        videoId,
        description,
        thumbnail,
        link,
        viewCount,
      });
      resultTable.push({
        title: title,
        viewCount: viewCount,
        videoUrl: link,
      });
    }
    console.table(resultTable.sort((a, b) => b.viewCount - a.viewCount));
    return result;
  } catch (error) {
    console.error("유튜브 요청 실패", error.message);
    return undefined;
  }
}
