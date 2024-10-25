//숫자 맞히기 게임
//터미널로...
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//재귀함수 이용한 숫자 맞히기 게임

const rand = Math.floor(Math.random() * 100 + 1);
let count = 0;
function questions(rand) {
  rl.question("1부터 100 사이의 숫자를 맞혀보세요. : ", (input) => {
    count++;
    //입력받은 숫자와 비교
    if (input > rand) {
      console.log("더 작은 숫자입니다.");
      questions(rand);
    } else if (input < rand) {
      console.log("더 큰 숫자입니다.");
      questions(rand);
    } else if (input == rand) {
      console.log("정답입니다!");
      console.log(`${count}번째에 맞히셨습니다!`);
      rl.close();
      return;
    }
  });
}
questions(rand);
