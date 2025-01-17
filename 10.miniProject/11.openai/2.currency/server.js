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

app.post("/api/chat-currency", async (req, res) => {
  const { amount, from, to } = req.body;
  console.log("사용자 입력 : ", amount, from, to);
  const exchangeRate = {
    USD: 1.0,
    KRW: 1400,
    EUR: 0.8,
  };
  function convertCurrency(amount, from, to) {
    const baseAmount = amount / exchangeRate[from];
    const convertedAmount = baseAmount * exchangeRate[to];
    return convertedAmount.toFixed(2);
  }
  const convertedAmount = convertCurrency(amount, from, to);
  const message = `${amount} ${from}은 ${convertedAmount} ${to} 와 같습니다.`;
  res.json({ convertedAmount, message });

  // try {
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [
  //       {
  //         role: "system",
  //         content: "You are a professinal programmer",
  //       },
  //       { role: "user", content: question },
  //     ],
  //     temperature: 0.7,
  //   });
  //   const answer = response.choices[0].message.content;
  //   console.log(answer);
  //   res.json({ answer });
  // } catch (error) {}
});
app.listen(3000, () => {
  console.log("서버 레디 포트 : 3000");
});
