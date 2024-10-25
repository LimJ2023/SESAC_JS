//숫자 맞히기 게임
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rand = Math.floor(Math.random() * 100 + 1);

function questions() {
  let count = 0;
  console.log("1~100까지 숫자를 맞혀보세요.");
  rl.on("line", (input) => {
    count++;
    //입력받은 숫자와 비교
    if (input > rand) {
      console.log("더 작은 숫자입니다.");
    } else if (input < rand) {
      console.log("더 큰 숫자입니다.");
    } else if (input == rand) {
      console.log("정답입니다!");
      console.log(`${count}번째에 정답을 맞히셨습니다.`);
      rl.close();
      return;
    }
  });
}
questions();
