function askQuestion(query) {
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      //성공시 처리는 이렇게
      rl.close();
      resolve(answer);
    });
  });
}

//내 안에 비동기 함수가 있다는 뜻..(함수를 바꾸는게 아님)
async function askQuestions() {
  const answer1 = await askQuestion("원하는 값1을 입력하세요.");
  console.log("입력한 값은 : ", answer1);
  const answer2 = await askQuestion("원하는 값2을 입력하세요.");
  console.log("입력한 값은 : ", answer2);
}
askQuestions();
