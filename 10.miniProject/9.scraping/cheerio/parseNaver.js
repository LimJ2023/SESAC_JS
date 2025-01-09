const axios = require("axios");
// cheerio <- dom 파싱하는거 도와줌
const cheerio = require("cheerio");

const url = "https://news.naver.com/section/105";
axios.get(url).then((response) => {
  const $ = cheerio.load(response.data);
  const headSection = $(".sa_list.sa_text_strong");

  const news = $(".as_headline .sa_list .sa_text_strong");
  news.each((index, element) => {
    console.log($(element).text());
  });

  //   console.log(news);
});
