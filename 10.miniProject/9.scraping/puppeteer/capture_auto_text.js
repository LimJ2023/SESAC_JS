const puppeteer = require("puppeteer");

(async () => {
  const url = "https://www.naver.com";
  const resolutions = [
    { name: "default", width: 800, height: 600 },
    { name: "pc", width: 1920, height: 1080 },
    { name: "mobile", width: 375, height: 667 },
  ];
  const browser = await puppeteer.launch({
    headless: true, // 화면이 표시되도록
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // 권한 문제 해결
  });
  const page = await browser.newPage();

  for (const resolution of resolutions) {
    // 해상도 변경
    await page.setViewport({
      width: resolution.width,
      height: resolution.height,
    });

    await page.goto(url, { waitUntil: "networkidle2" });

    const jpgPath = `output_${resolution.name}.jpg`;
    await page.screenshot({
      path: jpgPath,
      type: "jpeg",
      quality: 80,
      // fullPage: true,
    });
    console.log("jpg 파일 저장 완료", jpgPath);
  }

  await browser.close();
})();
