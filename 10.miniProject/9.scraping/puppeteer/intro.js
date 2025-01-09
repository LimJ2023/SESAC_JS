const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 화면이 표시되도록
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // 권한 문제 해결
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");



  
  await browser.close();
})();
