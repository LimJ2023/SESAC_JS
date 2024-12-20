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
    //menu가 string 타입으로 반환됨. rl.question의 promise의 반환형태가 string.
    const menu = await rl.question("원하는 작업을 선택하세요 : ");
    switch (menu) {
      case "1":
        console.log(`=> 현재 잔액은 ${balance}원 입니다.`);
        break;
      case "2":
        //동기 시켜야할 경우, 멈춰야 할 경우 await으로 지연처리
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

  //async 로 비동기 함수 선언
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
