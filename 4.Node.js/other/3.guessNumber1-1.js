//숫자 맞히기 게임
//터미널로...
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input,
  output,
});

// async await 이용해 만든 숫자 맞히기 게임

async function numberGame() {
  const rand = Math.floor(Math.random() * 100 + 1);
  console.log("디버그용 정답 : ㅎㅎ", rand);
  while (true) {
    const answer = await rl.question("1부터 100 사이의 숫자를 맞혀보세요. : ");
    if (answer == rand) {
      console.log("정답입니다!");
      break;
    }
    if (answer < rand) {
      console.log("더 큰 숫자입니다.");
    } else {
      console.log("더 작은 숫자입니다.");
    }
  }
  console.log("end");
  rl.close();
}
numberGame();
