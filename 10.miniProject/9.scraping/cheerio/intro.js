const axios = require("axios");
// cheerio <- dom 파싱하는거 도와줌
const cheerio = require("cheerio");

const url = "https://example.com";
axios.get(url).then((response) => {
  //   console.log(response.data);
  const $ = cheerio.load(response.data);
  const title = $("title").text(); // jquery와 통일성을 위해 $라는 변수로도 만들 수 있겠구나 함.
  console.log(title);
});
