const OpenAI = require("openai");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error("키 오류");
  process.exit(1);
}

const openai = new OpenAI({
  apikey: openaiApiKey,
});

async function getChatGPTResponse(userInput) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professinal cook who can make korean dish",
        },
        { role: "user", content: userInput },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("오류!,", error.message);
  }
}
async function chatWithUser() {
  const userInput = "안녕 챗봇";
  const aiResponse = await getChatGPTResponse(userInput);
  console.log("챗봇응답 lib : ", aiResponse);
}

chatWithUser();
