const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.log("유튜브 api 키는 필수입니다.");
  process.exit(1); // 종료
}

const searchUrl = "https://www.googleapis.com/youtube/v3/search";
const videosUrl = "https://www.googleapis.com/youtube/v3/videos";

const totalPages = 1;

const fetchYoutube = async () => {
  let nextPagetoken = null;
  const searchResult = [];
  const table = [];
  const idTable = [];
  try {
    for (let page = 1; page <= totalPages; page++) {
      const params = {
        part: "snippet",
        q: "소녀전선2",
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
        let title = item.snippet.title; // 영상제목
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youbube.com/watch?v=${videoId}`; // 만든 rul
        let description = item.snippet.description;
        // 각 비디오 클립에 대해 추가정보 조회
        const params = {
          part: "statistics",
          id: videoId,
          key: API_KEY,
        };
        const response = await axios.get(videosUrl, { params });
        const data = response.data;
        const viewCount = data.items[0].statistics.viewCount;
        // console.log("제목 : ", title);
        // console.log("URL : ", videoUrl);
        // console.log("desc : ", description);
        // console.log("viewCount : ", viewCount);
        // console.log("-".repeat(40));
        const maxdescriptionLength = 20;
        if (description.length > maxdescriptionLength) {
          description = description.slice(0, maxdescriptionLength) + "...";
        }
        table.push({
          title: title,
          description: description,
          viewCount: viewCount,
        });
      }
    }
    console.table(table);
  } catch (error) {
    console.error("유튜브 요청 실패", error.message);
  }
};

const fetchYoutube_parallel = async () => {
  let nextPagetoken = null;
  const searchResult = [];
  const idTable = [];
  try {
    for (let page = 1; page <= totalPages; page++) {
      const params = {
        part: "snippet",
        q: "소녀전선2",
        type: "video",
        maxResults: 5,
        pageToken: nextPagetoken,
        key: API_KEY,
      };
      const response = await axios.get(searchUrl, { params });
      const data = response.data;
      searchResult.push(...data.items);
      nextPagetoken = data.nextPagetoken;
    }

    // 프로미스 all로 전체를 병행처리
    const table = await Promise.all(
      // 이 안에서 프로미스들이 처리한게 모두 끝나면 종료
      searchResult.map(async (item, index) => {
        let title = item.snippet.title; // 영상제목
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youbube.com/watch?v=${videoId}`; // 만든 rul
        let description = item.snippet.description;
        // 각 비디오 클립에 대해 추가정보 조회
        const params = {
          part: "statistics",
          id: videoId,
          key: API_KEY,
        };
        const response = await axios.get(videosUrl, { params });
        const data = response.data;
        const viewCount = data.items[0].statistics.viewCount;
        // console.log("제목 : ", title);
        // console.log("URL : ", videoUrl);
        // console.log("desc : ", description);
        // console.log("viewCount : ", viewCount);
        // console.log("-".repeat(40));
        const maxdescriptionLength = 20;
        if (description.length > maxdescriptionLength) {
          description = description.slice(0, maxdescriptionLength) + "...";
        }
        return {
          title: title,
          description: description,
          viewCount: viewCount,
        };
      })
    );
    console.table(table);
  } catch (error) {
    console.error("유튜브 요청 실패", error.message);
  }
};

console.time("실행시간");
async () => {
  await fetchYoutube_parallel();
  console.timeEnd("실행시간");
};

// fetchYoutube();
