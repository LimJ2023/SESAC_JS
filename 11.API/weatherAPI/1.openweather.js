const axios = require("axios");
require("dotenv").config();

const url = "https://api.openweathermap.org/data/2.5/weather";

const params = {
  q: "Seoul",
  apiKey: process.env.OPENWEATHER_API_KEY, //바로 쓰지 않는다.
  units: "metric", // 섭씨로 바꿈.
};

const fetchweather = async () => {
  const response = await axios.get(url, { params });
  //   console.log("await axios 응답 : ", response.data);
  const weather = response.data;
  console.log(`도시 :  ${weather.name}`);
  console.log(`온도 :  ${weather.main.temp} c 섭씨`);
  console.log(`날씨 :  ${weather.weather[0].description}`);
};
axios.get(url, { params }).then((response) => {
  //   console.log("응답 : ", response.data);
});
fetchweather();
