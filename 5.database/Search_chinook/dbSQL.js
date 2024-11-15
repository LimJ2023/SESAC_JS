const sqlite = require("better-sqlite3");
const dbfile = "chinook.db";
const db = new sqlite(dbfile);

function search(query, scope, page, limit) {
  const fixedQuery = "%" + query + "%";

  const offset = (page - 1) * limit;

  const preQuery = resultQuery(scope);
  const stmt = db.prepare(preQuery);
  console.log({ query: fixedQuery, limit: limit, offset: offset }); // 매개변수 확인

  return stmt.all({ query: fixedQuery, limit: limit, offset: offset });
}
function resultQuery(scope) {
  if (scope === "albums") {
    return "SELECT title FROM albums WHERE title LIKE :query LIMIT :limit OFFSET :offset;";
  } else if (scope === "customers") {
    return `SELECT FullName
                    FROM (
                        SELECT FirstName ||' '|| LastName AS FullName
                        FROM customers)
                    WHERE FullName LIKE :query LIMIT :limit OFFSET :offset;`;
  } else if (scope === "composer") {
    return `SELECT DISTINCT composer FROM tracks WHERE composer LIKE :query LIMIT :limit OFFSET :offset;`;
  } else {
    return `SELECT name FROM ${scope} WHERE name LIKE :query LIMIT :limit OFFSET :offset;`;
  }
}
function resultTotal(input, scope, limit) {
  const fixedQuery = "%" + input + "%";
  let query = "";
  if (scope === "albums") {
    query = "SELECT COUNT(*) as total FROM albums WHERE title LIKE ?;";
  } else if (scope === "customers") {
    query = `SELECT COUNT(*)  as total 
                      FROM (
                          SELECT FirstName ||' '|| LastName AS FullName
                          FROM customers)
                      WHERE FullName LIKE ?;`;
  } else if (scope === "composer") {
    query = `SELECT DISTINCT COUNT(*) as total FROM tracks WHERE composer LIKE ?;`;
  } else {
    query = `SELECT COUNT(*) as total FROM ${scope} WHERE name LIKE ?;`;
  }
  const stmt = db.prepare(query);
  const count = stmt.get(fixedQuery);
  const totalPage = Math.ceil(count.total / limit);
  return totalPage;
}
module.exports = { search, resultTotal };
