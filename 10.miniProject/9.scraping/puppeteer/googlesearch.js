const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // 권한 문제 해결
    // defaultViewport: {
    //   width: 1920,
    //   height: 1080,
    // },
  });

  // 새 탭
  const page = await browser.newPage();
  // 구글이동
  await page.goto("https://google.com");
  // 검색시키기
  await page.type("textarea[name='q']", "javascript programming");
  // 엔터
  await page.keyboard.press("Enter");

  //검색 결과 dom 찾기
  await page.waitForSelector("div#search"); // div#res

  // 이 결과 내에서 원하는 요소 추출
  const results = await page.evaluate(() => {
    const items = [];

    const resDiv = document.querySelector("div#search");
    const elements = resDiv.querySelectorAll("h3");

    elements.forEach((element, i) => {
      const linkElement = element.closest("a");
      items.push({
        title: element.innerText,
        url: linkElement ? linkElement.href : "링크 없음",
      });
    });
    return items;
  });
  console.log("검색결과 : ", results);

  // 스크린 캡쳐
  await page.screenshot({ path: "screentshot.png" });
  await browser.close();
})();
