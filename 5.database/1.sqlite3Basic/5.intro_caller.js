const { runDb, dbAllQuery } = require("./5.intro_library");

async function runDatabaseOperations() {
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
}

runDatabaseOperations();

console.log("가장 먼저 출력됨");
