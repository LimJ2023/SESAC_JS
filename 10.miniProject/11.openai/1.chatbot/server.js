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

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.post("/api/chat", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professinal programmer",
        },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });
    const answer = response.choices[0].message.content;
    console.log(answer);
    res.json({ answer });
  } catch (error) {
    console.error("오류!,", error.message);
    res.status(500).json({ error: "알 수 없는 오류" });
  }
});

app.listen(3000, () => {
  console.log("서버 레디 포트 : 3000");
});
