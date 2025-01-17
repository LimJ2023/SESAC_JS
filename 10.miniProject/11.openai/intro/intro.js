const axios = require("axios");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const url = "https://api.openai.com/v1/chat/completions";

console.log(openaiApiKey);
async function getChatGPTResponse(userInput) {
  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: userInput }],
        temperature: 0.7, // 창의성을 나타냄 1로 갈수록 창의적
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("챗봇 응답을 가져오는 중 오류 발생, ", error.message);
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error("api키가 잘못되었습니다.");
      } else if (status === 429) {
        console.error("크레딧 만료 혹은 과도한 요청으로 오류 발생");
      }
    }
    return "챗봇 응답을가져오는 도중 오류가 발생했습니다.";
  }
  //   console.log("res", response.data.choices[0].message.content);
}

async function chatWithUser() {
  const userInput = "안녕 챗봇";
  const aiResponse = await getChatGPTResponse(userInput);
  console.log("챗봇응답 : ", aiResponse);
}

chatWithUser();

// setInterval(chatWithUser, 1000);
