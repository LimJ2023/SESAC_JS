const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let balance = 10000;
function atm() {
  rl.on("line", (input) => {
    const menu = input;
    switch (menu) {
      case "1":
        console.log(`=> 현재 잔액은 ${balance}원 입니다.`);
        break;
      case "2":
        insertMoney(input);
        break;
      case "3":
        Withdraw();
        break;
      case "4":
        console.log("=> ATM을 종료합니다.");
        isRun = false;
        rl.close();
        break;
      default:
        console.log("=> 올바른 메뉴를 선택해주세요.");
        break;
    }
    printMenu();
  });

  function insertMoney(input) {
    console.log("입금할 금액을 입력하세요 : ");
    let money = Number(input);
    if (isNaN(money) || money < 0) {
      console.log("=> 올바른 금액을 입력해주세요.");
    } else if (money == 0) {
      console.log("=> 장난하지 마세요");
    } else {
      balance += money;
      console.log(`=> ${money}원이 입금되었습니다.`);
    }
  }
  function Withdraw() {
    const input3 = rl.question("출금할 금액을 입력하세요 : ");
    const money = Number(input3);

    if (isNaN(money) || input3 < 0) {
      console.log("=> 올바른 금액을 입력해주세요.");
    } else if (money > balance) {
      console.log("=> 잔액이 부족합니다.");
    } else if (money == 0) {
      console.log("=> 모함??????");
    } else {
      balance -= money;
      console.log(
        `=> ${money}원이 인출되었습니다.

    현재 잔액은 ${balance}원 입니다.`
      );
    }
  }
}
function printMenu() {
  console.log(`
    ATM 메뉴 : 
    1. 잔액 확인
    2. 입금
    3. 인출
    4. 종료
    `);
  console.log("원하는 작업을 선택해 주세요 : ");
}
atm();
printMenu();
