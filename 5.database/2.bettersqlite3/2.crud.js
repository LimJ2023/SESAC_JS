const sqlite = require("better-sqlite3");

const db = sqlite("test2.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

// 데이터 조회
const selectAll = db.prepare("SELECT * FROM users");
const result = selectAll.all();
result.forEach((row) => {
  console.log("조회 결과 : ", row);
});

// 데이터 삽입
const newUser = {
  username: "user1",
  email: "user1@user1.com",
};
const insert = db.prepare("INSERT INTO users (username, email) VALUES(?, ?)");
const insertResult = insert.run(newUser.username, newUser.email);
console.log("사용자 추가 완료", insertResult.lastInsertRowid);

// 특정 사용자 조회
const userId = 1;
// const user = db.prepare("SELECT * FROM users WHERE id = ?");
// const userResult = user.get(userId);
const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
console.log("가져온 유저 : ", user);

// 사용자 업데이트
const updateUser = {
  id: 1,
  username: "update",
  email: "update@example.com",
};

db.prepare("UPDATE users SET user name = ?, email = ?, WHERE id = ?").run(
  updateUser.username,
  updateUser.email,
  updateUser.id
);

console.log("업데이트 완료");

const deleteUser = 1;
db.prepare("DLETE FROM users WHERE id = ?").run(deleteUser);
console.log("사용자 삭제");

db.close();
console.log("끝남");
