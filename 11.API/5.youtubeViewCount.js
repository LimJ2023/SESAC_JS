const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.log("유튜브 api 키는 필수입니다.");
  process.exit(1); // 종료
}

const searchUrl = "https://www.googleapis.com/youtube/v3/search";
const videosUrl = "https://www.googleapis.com/youtube/v3/videos";

const totalPages = 2;

const fetchYoutube = async () => {
  let nextPagetoken = null;
  const searchResult = [];
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

      const response = await axios.get(searchUrl, { params });
      const data = response.data;
      searchResult.push(...data.items);
      nextPagetoken = data.nextPagetoken;

      for (const item of searchResult) {
        const title = item.snippet.title; // 영상제목
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youbube.com/watch?v=${videoId}`; // 만든 rul
        const description = item.snippet.description;

        // 각 비디오 클립에 대해 추가정보 조회
        const params = {
          part: "statistics",
          id: videoId,
          key: API_KEY,
        };
        const response = await axios.get(videosUrl, { params });
        const data = response.data;
        const viewCount = data.items[0].statistics.viewCount;
        console.log("제목 : ", title);
        console.log("URL : ", videoUrl);
        console.log("desc : ", description);
        console.log("viewCount : ", viewCount);
        console.log("-".repeat(40));
      }
    }
  } catch (error) {
    console.error("유튜브 요청 실패", error.message);
  }
};
fetchYoutube();
