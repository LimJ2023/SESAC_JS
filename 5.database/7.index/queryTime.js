const sqlite3 = require("sqlite3").verbose();

function connectToDatabase() {
  return new sqlite3.Database("mydb.db");
}

function queryName(db, searchName) {
  const selectQuery = `SELECT * FROM employees WHERE name = ?`;
  console.time("Query Time");

  db.get(selectQuery, [searchName], (err, row) => {
    if (err) {
      console.error(err.messagae);
    } else {
      console.log("Result", row);
    }
  });
  console.timeEnd("Query Time");
}

function queryAll(db, searchOptions) {
  // 1=1 이라는 true를 써서 일관성있게 AND를 붙여줬다. 이거 재밌음
  let selectQuery = `SELECT * FROM employees WHERE 1=1 `;
  const queryParams = [];

  //띄어쓰기 유의. (JAVA에서도 있었지)
  if (searchOptions.name) {
    selectQuery += `AND name = ?`;
    queryParams.push(searchOptions.name);
  }
  //AND~~~~
  if (searchOptions.department) {
    selectQuery += `AND department = ?`;
    queryParams.push(searchOptions.department);
  }
  if (searchOptions.salary) {
    selectQuery += `AND salary = ?`;
    queryParams.push(searchOptions.salary);
  }

  db.all(selectQuery, queryParams, (err, rows) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("결과 : ", rows);
      return rows;
    }
  });
}
module.exports = { connectToDatabase, queryName, queryAll };
