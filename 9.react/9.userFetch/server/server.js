const express = require("express");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 20,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    age: 40,
  },
];

app.get("/api/users", (req, res) => {
  res.json({ users });
});

app.listen(3001, () => {
  console.log("서버 레디");
});
