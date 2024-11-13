const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  // 생성
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`);
  db.run("INSERT INTO users (id, name) VALUES (1,'Alice')");
  db.run("INSERT INTO users (id, name) VALUES (2,'Bob')");
  // 미리 준비시켜놓기.
  const statement = db.prepare("INSERT INTO users VALUES (?, ?)");
  statement.run(3, "user3");
  statement.run(4, "user4");
  statement.run(5, "user5");
  statement.finalize();
  // 데이터 조회
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log("조회된 데이터  :", rows);
  });

  db.each("SELECT id, name FROM users", (err, row) => {
    console.log("조회 : ", row.id, row.name);
  });
});
// db 종료
db.close((err) => {
  if (err) throw err;
  console.log("db 연결 정상 종료");
});
