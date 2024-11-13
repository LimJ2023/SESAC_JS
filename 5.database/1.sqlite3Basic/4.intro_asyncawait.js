const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db"); // 없으면 생성, 있으면 불러오기
// const db = new sqlite3.Database(":memory:");
function runDb(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function dbAllQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

(async () => {
  try {
    await runDb("CREATE TABLE IF NOT EXISTS messages (text TEXT)");
    await runDb("INSERT INTO messages(text) VALUES (?)", ["hello, SQLite"]);
    const rows = await dbAllQuery("SELECT * FROM messages");
    rows.forEach((row) => {
      console.log(row);
    });
  } catch (error) {
  } finally {
    db.close();
  }
})();
