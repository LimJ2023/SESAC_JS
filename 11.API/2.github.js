const axios = require("axios");
require("dotenv").config();

const username = "LIMJ2023";
const url = `https://api.github.com/users/${username}/repos`;
const token = process.env.GITHUB_API_TOKEN;
// axios.get(url).then((response) => {
//   console.log("내 레포 정보 : ", response.data);
// });

const fetchgitHub = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (response.status === 200) {
      // 내 리포 목록
      // console.log("내 리포 목록 : ", response.data);
      const repos = response.data;
      // 최근에 업데이트가 이루어진 리포들

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      // 최근 한 달 이내 업데이트가 이루어진 리포들 출력
      const updatedRepos = repos.filter((r) => {
        const date = new Date(r.updated_at);
        if (oneMonthAgo <= date) {
          const strDate = date.toISOString().split("T")[0];
          console.log(r.name, strDate);
          return r;
        }
      });
      console.log(updatedRepos);
    } else {
      console.log("깃허브 api 패치중 오류 : ", response.status);
    }
  } catch (error) {
    console.log("깃허브 정보 가져오는중 에러", error.message);
  }
};
fetchgitHub();
