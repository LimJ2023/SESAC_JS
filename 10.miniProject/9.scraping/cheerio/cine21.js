const axios = require("axios");
// cheerio <- dom 파싱하는거 도와줌
const cheerio = require("cheerio");

const url = "http://www.cine21.com/rank/boxoffice/domestic";
axios.get(url).then((response) => {
  //   console.log(response.data);
  const $ = cheerio.load(response.data);
  $.remove(); // script를 다 삭제

  const title = $("title").text();
  console.log($.html());
});
