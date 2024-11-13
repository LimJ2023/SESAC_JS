const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db"); // 없으면 생성, 있으면 불러오기
// const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)");

// db.run("INSERT INTO messages(text) VALUES ('hello, SQLite')");
db.run("INSERT INTO messages(text) VALUES (?)", ["hello, SQLite"]);

db.each("SELECT * FROM messages", (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();
