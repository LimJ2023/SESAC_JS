const axios = require("axios");

// 특정 사용자의 게시글 가져오기

const userId = 1;
const getUserPosts = async () => {
  const postUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await axios.get(postUrl);

  console.log(userId, "번 유저의 포스팅 : ", response.data);
};

const getPostComments = async () => {
  const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${userId}/comments`;
  const response = await axios.get(commentsUrl);

  console.log(userId, "번 게시글의 댓글들 : ", response.data);
  response.data.forEach((c) => {
    console.log(c.name);
  });
};
// getUserPosts();
getPostComments();
