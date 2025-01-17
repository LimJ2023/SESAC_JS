const express = require("express");
const morgan = require("morgan");

const OpenAI = require("openai");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error("키 오류");
  process.exit(1);
}

const app = express();
const openai = new OpenAI({
  apikey: openaiApiKey,
});

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
const reviews = [];
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/api/reviews", (req, res) => {
  res.json({ reviews });
});
app.post("/api/review", async (req, res) => {
  const { rating, comment } = req.body;
  console.log("사용자 입력: ", rating, comment);

  reviews.push({ rating, comment });
  res.status(201).json({ message: "등록 완료" });
});

app.get("/api/ai-summary", async (req, res) => {
  if (reviews.length === 0) {
    return res.json({ summary: "리뷰가 없습니다", averageRating: 0 });
  }
  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "너는 후기 분석 전문가야 후기를 한글로 간략히 요약해줘",
        },
        { role: "user", content: JSON.stringify(reviews) },
      ],
      temperature: 0.7,
    });
    const summary = response.choices[0].message.content;
    console.log(summary);
    res.json({ summary, averageRating });
  } catch (error) {
    console.error("오류!,", error.message);
    res.status(500).json({ error: "알 수 없는 오류" });
  }
});
app.listen(3000, () => {
  console.log("서버 레디 포트 : 3000");
});
