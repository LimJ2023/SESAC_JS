const fetch = require("node-fetch");
const axios = require("axios");

async function fetchExample() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!response.ok) {
      console.log("에러");
      return;
    }
    const data = await response.json();
    console.log("가져온 데이터", data);
  } catch (error) {
    console.log(error.message);
  }
}

async function axiosExample() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(response.status);
    console.log("데이터 : ", response.data);
  } catch (error) {
    console.log("axios 에러 ", error.message);
  }
}
(async () => {
  await fetchExample();
  await axiosExample();
})();
