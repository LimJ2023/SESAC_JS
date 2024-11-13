const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db"); // 없으면 생성, 있으면 불러오기
// const db = new sqlite3.Database(":memory:");

(async () => {
  try {
    await new Promise((resolve, reject) => {
      db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
        if (err) reject(err);
        //성공했을 때..
        resolve();
      });
    });
  } catch (error) {
    console.log(error);
  }
})(); // 비동기 익명 함수로 만든 후 바로 실행.

(async () => {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO messages(text) VALUES (?)",
        ["hello, SQLite"],
        (err) => {
          if (err) reject(err);
          console.log("데이터 삽입 성공");
          resolve();
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
})(); // 비동기 익명 함수로 만든 후 바로 실행.

db.each("SELECT * FROM messages", (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();
