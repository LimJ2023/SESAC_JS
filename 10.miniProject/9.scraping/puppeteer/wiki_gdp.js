const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // 화면이 표시되도록
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // 권한 문제 해결
  });
  const page = await browser.newPage();
  await page.goto(
    "https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)"
  );
  const title = await page.title();
  console.log("페이지제목: ", title);

  // 촏cheerio 사용법
  const content = await page.content();
  const $ = cheerio.load(content);
  const countryDataByCheerio = [];
  const tableRows = $("table.wikitable").find("tr");
  tableRows.each((i, element) => {
    const columns = $(element).find("td");
    const country = $(columns[0]).text().trim();
    const gdp = $(columns[1]).text().trim();
    if (country && gdp) {
      countryDataByCheerio.push({ country, gdp });
    }
    // console.log(`${i + 1}: 국가 : ${country}, gdp: ${gdp}`);
  });
  console.log(countryDataByCheerio);
  // gdp가 10000~20000사이인 국가만 출력
  const filteredCountryDataByCheerio = countryDataByCheerio.filter((c) => {
    const gdpValue = Number(c.gdp.replaceAll(",", ""));
    return gdpValue >= 10000 && gdpValue <= 20000;
  });
  console.log(filteredCountryDataByCheerio);

  // puppeteer로 파싱
  //   const countryData = await page.evaluate(() => {
  //     const rows = document.querySelectorAll("table.wikitable tr");
  //     return Array.from(rows)
  //       .map((row) => {
  //         const columns = row.querySelectorAll("td");
  //         return {
  //           country: columns[0]?.innerText.trim() || "N/A",
  //           gdp: columns[1]?.innerText.trim() || "N/A",
  //         };
  //       })
  //       .filter((item) => item.country !== "N/A");
  //   });
  //   // 국가명을 기준으로 정렬한다.

  //   countryData.sort((a, b) => a.country.localeCompare(b.country));
  //   console.log(countryData);
  await browser.close();
})();
