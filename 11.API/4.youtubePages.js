const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.log("유튜브 api 키는 필수입니다.");
  process.exit(1); // 종료
}

const url = "https://www.googleapis.com/youtube/v3/search";
const maxResultPerPage = 5;
const totalPages = 5;

const fetchYoutube = async () => {
  let nextPagetoken = null;
  try {
    for (let page = 1; page <= totalPages; page++) {
      const params = {
        part: "snippet",
        q: "아이유",
        type: "video",
        maxResults: 5,
        pageToken: nextPagetoken,
        key: API_KEY,
      };

      const response = await axios.get(url, { params });
      const data = response.data;
      nextPagetoken = data.nextPagetoken;

      data.items.forEach((item) => {
        const title = item.snippet.title; // 영상제목
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youbube.com/watch?v=${videoId}`; // 만든 rul
        const description = item.snippet.description;

        console.log("제목 : ", title);
        console.log("URL : ", videoUrl);
        console.log("desc : ", description);
        console.log("-".repeat(40));
      });
    }
  } catch (error) {
    console.error("유튜브 요청 실패", error.message);
  }
};
fetchYoutube();
