const sqlite = require("better-sqlite3");

const db = sqlite("test2.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
    )`);

// 데이터 삽입
const insert = db.prepare("INSERT INTO greetings (message) VALUES(?)");
const insertResult = insert.run("헬로우 b-sqlite3");
console.log(insertResult);

// 데이터 조회
const select = db.prepare("SELECT * FROM greetings");
const result = select.all();
result.forEach((row) => {
  console.log("조회 결과 : ", row.message);
});
console.log("끝남");
