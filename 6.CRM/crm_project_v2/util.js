require("dotenv").config();
const sqlite3 = require("better-sqlite3");
const db = new sqlite3(process.env.DATABASE);

function paging(curPage, countQuery, params) {
  const totalData = db.prepare(countQuery).get(params);
  const total = Math.ceil(Number(totalData.count) / process.env.LIMIT);
  const pageRange = 3;
  const totalArr = [];
  let lastElement;
  for (let i = 1; i <= total; i++) {
    //이 중에 조건 맞는 애만 푸시
    if (i <= 3) {
      totalArr.push(i);
      lastElement = i;
    } else if (i >= total - 2) {
      totalArr.push(i);
      lastElement = i;
    }
    // 페이지 기준 앞뒤로 3개 페이지 들어감
    else if (i >= curPage - pageRange && i <= curPage + pageRange) {
      totalArr.push(i);
      lastElement = i;
    } else {
      if (lastElement !== "...") {
        totalArr.push("...");
        lastElement = "...";
      }
    }
  }
  return totalArr;
}

module.exports = paging;
