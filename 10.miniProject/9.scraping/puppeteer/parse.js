const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 화면이 표시되도록
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // 권한 문제 해결
  });
  const page = await browser.newPage();
  const html = `
      <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>파싱테스트</title>
  </head>
  
  <body>
      <div>
          <p>첫번째 문단</p>
          <p>두번째 문단</p>
      </div>
      <a href="https://www.naver.com">네이버 링크</a>
      <p>또 하나의 문단</p>
      <div class="box"> box클래스 내용</div>
  </body>
  
  </html>
  `;
  const $ = cheerio.load(html);
  const paragraphs = $("p");
  paragraphs.each((index, element) => {
    console.log(`패러그래프: ${$(element).text()}`);
  });

  const link = $("a").attr("href");
  // console.log("하이퍼링크", link);
  console.log("첫번째 p만 필요하다면?");
  // console.log($("p").eq(0).text());
  console.log($("p").first().text());
  console.log("두번째 p만 필요하다면?");
  console.log($("p").eq(1).text());
  console.log("마지막막 p만 필요하다면?");
  console.log($("p").last().text());

  await browser.close();
})();
