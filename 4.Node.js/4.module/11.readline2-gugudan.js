import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//이걸 통해서 사용자로부터 입출력이 가능

rl.question("구구단의 단을 입력하시오. ", (input) => {
  const num = parseInt(input);
  if (isNaN(num)) {
    console.log("숫자만 입력할 수 있습니다.");
    rl.close();
    return;
  } else if (input >= 1 && input <= 9) {
    console.log(`${input}단을 출력합니다.`);
    for (let i = 1; i < 10; i++) {
      console.log(`${input} * ${i} = ${input * i}`);
    }
    rl.close();
  }
});
