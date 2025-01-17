const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // 권한 문제 해결
    // defaultViewport: {
    //   width: 1920,
    //   height: 1080,
    // },
  });

  // 새 탭
  const page = await browser.newPage();
  // 이동
  await page.goto("http://www.cine21.com/rank/boxoffice/domestic");

  const pageNumber = await page.$(".pagination .page a");

  // 이 결과 내에서 원하는 요소 추출
  const results = await page.evaluate(async () => {
    const items = [];
    //페이지 수 구해와보기

    for (p of pageNumber) {
      console.log(p.click());
    }
    const boxoffice_list = document.querySelector(".boxoffice_list");
    const lias = boxoffice_list.querySelectorAll("li>a");
    lias.forEach((a, i) => {
      const mov_name = a.getElementsByClassName("mov_name")[0];
      const grade = a.getElementsByClassName("grade")[0];
      items.push({
        title: mov_name.textContent,
        grade: grade.textContent,
      });
    });
    return items;
  });
  // console.log("검색결과 : ", results);

  await browser.close();
})();
