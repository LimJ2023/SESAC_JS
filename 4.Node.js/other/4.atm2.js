import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

//async await 이용하여 만든 atm

let balance = 10000;

async function atm() {
  let isRun = true;
  while (isRun) {
    console.log(`
    ATM 메뉴 : 
    1. 잔액 확인
    2. 입금
    3. 인출
    4. 종료
    `);
    const menu = await rl.question("원하는 작업을 선택하세요 : ");
    switch (menu) {
      case "1":
        await CheckBalance();
        break;
      case "2":
        await insertMoney();
        break;
      case "3":
        await Withdraw();
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
  }

  async function CheckBalance() {
    console.log(`=> 현재 잔액은 ${balance}원 입니다.`);
  }
  async function insertMoney() {
    const input = await rl.question("입금할 금액을 입력하세요 : ");
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
  async function Withdraw() {
    const input = await rl.question("출금할 금액을 입력하세요 : ");
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
  }
}

atm();
