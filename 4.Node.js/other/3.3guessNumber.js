function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

const readline = require("readline");

let a = getRandomNumber(100);

// 입력 받으곳 = input()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let attempts = 0;
console.log("아무 숫자나 입력하세요");
console.log("디버그용. 정답:", a);
rl.on("line", (line) => {
  line = parseInt(line);
  attempts++;
  if (line > a) {
    console.log("입력 값이 크네요");
  } else if (line < a) {
    console.log("입력 값이 작네요");
  } else if (line === a) {
    console.log("입력 값이 같습니다");

    console.log(` 입력하신 횟수는 ${attempts} 번 입니다`);

    rl.close();
  } else {
    console.log("에러(문제)가 생겼습니다");
  }
});

rl.on("close", () => {
  console.log();
  process.exit(0);
});
