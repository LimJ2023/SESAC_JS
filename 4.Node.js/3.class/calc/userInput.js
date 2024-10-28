class UserInput {
  constructor() {
    this.rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.calculator = null;
  }

  selectCalcMode() {
    console.log("계산기 선택 화면");
    console.log("1. 기본 계산기");
    console.log("2. 프로그래머 계산기");

    this.rl.question("원하는 계산기를 선택해주세요.(1,2)", (mode) => {
      switch (mode) {
        case "1":
          this.calculator = new StandardCalc();
          this.calculator.getUserInput();
          break;
        case "2":
          this.calculator = new ProgrammerCalc();
          break;
        default:
          console.log("올바른 숫자를 입력해주세요.");
          break;
      }
    });
  }

  getUserInput() {
    this.rl.question("첫 번째 숫자를 입력하세요. ", (num1) => {
      console.log(num1);
      const number1 = Number(num1);
      this.rl.question("연산자를 입력하시오 (+,-,*,/) ", (operator) => {
        this.rl.question("두번째 숫자를 입력하세요 ", (num2) => {
          const number2 = Number(num2);
          const result = this.calculator(number1, operator, number2);
          console.log("결과 : ", result);
          this.rl.close();
        });
      });
    });
  }
}

module.exports = UserInput;
