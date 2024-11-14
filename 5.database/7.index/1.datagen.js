const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("mydb.db");

const numData = 1_000_000;

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS employees (
        id  INTEGER PRIMARY KEY,
        name TEXT,
        department TEXT,
        salary INTERGER
        )`);
});

function getRandomName() {
  const lastname = ["김", "이", "박", "최", "정"];
  const firstname1 = ["가", "나", "다", "라", "마", "바"];
  const firstname2 = ["비", "사", "아", "자", "차", "카"];

  const randomLastName = lastname[Math.floor(Math.random() * lastname.length)];
  const randomfirstName1 =
    firstname1[Math.floor(Math.random() * firstname1.length)];
  const randomfirstName2 =
    firstname2[Math.floor(Math.random() * firstname2.length)];

  return { name: randomLastName + randomfirstName1 + randomfirstName2 };
}

function getRandomDept() {
  const departments = ["IT", "HR", "Engineering", "Marketing"];

  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomSalary() {
  return Math.floor(Math.random() * 100) * 1000 + 10000; // 10,000에서 100,000사이의 랜덤 급여
}

db.serialize(() => {
  console.time("Execution Time"); // 시간기록
  db.run("BEGIN TRANSACTION");
  const insertStmt = db.prepare(
    "INSERT INTO employees(name, department, salary) VALUES (?,?,?)"
  );
  for (let i = 0; i < numData; i++) {
    const { name } = getRandomName();
    const department = getRandomDept();
    const salary = getRandomSalary();

    insertStmt.run(name, department, salary, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  insertStmt.finalize();
  db.run("COMMIT", () => {
    console.timeEnd("Execution Time"); //시간 종료
  });
});
