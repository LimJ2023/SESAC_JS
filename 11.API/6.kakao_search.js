const axios = require("axios");
require("dotenv").config();

const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const webSearchUrl = "https://dapi.kakao.com/v2/search/web";
const videoSearchUrl = "https://dapi.kakao.com/v2/search/vclip";
const imageSearchUrl = "https://dapi.kakao.com/v2/search/image";
const headers = {
  Authorization: `KakaoAK ${REST_API_KEY}`,
};
let query = "소녀전선2";
let page = 1;
let totalPages = 0;
let isEnd = false;

async function searching(query, url, page) {
  const params = {
    query: query, // 필수
    sort: "accuracy", //옵셔널
    page: page,
    size: 10,
  };

  // 프로미스 체이닝 es6부터...
  //   axios.get(url, { headers, params }).then((response) => {
  //     const data = response.data;
  //     console.log(data);
  //   });

  //모던 js방식 -> async await
  try {
    const response = await axios.get(url, { headers, params });
    const data = await response.data;
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

searching(query, webSearchUrl, page);

const fetchPages = async () => {
  for (let page = 1; page <= totalPages; page++) {}
};
