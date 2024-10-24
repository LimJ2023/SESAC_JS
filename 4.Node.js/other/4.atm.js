const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//이걸 통해서 사용자로부터 입출력이 가능

let balance = 10000;

function atm(balance1) {
  let balance = Number(balance1);
  console.log(`
    ATM 메뉴 : 
    1. 잔액 확인
    2. 입금
    3. 인출
    4. 종료
    `);
  rl.question("원하는 작업을 선택하세요 : ", (input) => {
    switch (input) {
      case "1":
        CheckBalance(balance);
        break;
      case "2":
        insertMoney(balance);
        break;
      case "3":
        Withdraw(balance);
        break;
      case "4":
        exit();
        break;
      default:
        console.log("=> 올바른 메뉴를 선택해주세요.");
        atm(balance);
        break;
    }
  });

  function CheckBalance(balance) {
    console.log(`=> 현재 잔액은 ${balance}원 입니다.`);
    atm(balance);
  }
  function insertMoney(balance) {
    rl.question("입금할 금액을 입력하세요 : ", (input) => {
      let money = Number(input);
      if (isNaN(money) || money < 0) {
        console.log("=> 올바른 금액을 입력해주세요.");
      } else if (money == 0) {
        console.log("=> 장난하지 마세요");
      } else {
        balance += money;
        console.log(`=> ${money}원이 입금되었습니다.`);
      }
      atm(balance);
    });
  }
  function Withdraw(balance) {
    rl.question("출금할 금액을 입력하세요 : ", (input) => {
      const money = Number(input);

      if (isNaN(money) || input < 0) {
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
      atm(balance);
    });
  }
  //종료
  function exit() {
    console.log("=> ATM을 종료합니다.");
    rl.close();
  }
}
atm(balance);
