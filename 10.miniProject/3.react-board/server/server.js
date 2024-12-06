const express = require("express");
const cors = require("cors");
const sqlite = require("better-sqlite3");
const multer = require("multer");
// 변수
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3001;
const dbfile = "./db/board.db";
const db = new sqlite(dbfile);

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// 라우트
app.get("/api/posts", (req, res) => {
  const posts = db
    .prepare(
      `
        SELECT *
        FROM post
        `
    )
    .all();
  if (!posts) {
    res
      .status(404)
      .json({ error: true, message: "게시글 목록을 찾을 수 없음" });
  } else {
    res.json(posts);
  }
});

app.post("/post", upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log(title, content, image);
  db.prepare(
    `
        INSERT INTO post(title, content, image,postedAt) 
        values(?,?,?,date('now'));
    `
  ).run(title, content, image);
  console.log(req.url);
  res.redirect("http://localhost:3000/");
});

app.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `
        delete from post where id = ?;
    `
  ).run(id);

  res.json({ success: true });
});
app.listen(port, (req, res) => {
  console.log("서버 레디 on port : ", port);
});
