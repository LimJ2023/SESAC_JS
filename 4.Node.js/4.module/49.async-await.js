console.log("0.타이머로 비동기");

function setTimeoutSync(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay);
  });
}

async function executeTask() {
  await setTimeoutSync("1. 첫번째 작업 : 1초 후 실행", 1000);
  await setTimeoutSync("2. 두번째 작업 : 2초 후 실행", 1000);
  await setTimeoutSync("3. 세번째 작업 : 3초 후 실행", 1000);
  await setTimeoutSync("4. 세번째 작업 : 4초 후 실행", 1000);

  console.log("4.모든 작업이완료되었습니다.");
}

executeTask();

//이렇게 하면 2개를 동시에 then 처리. then의 위치에 유의!!!!
// setTimeoutSync("1. 첫번째 작업 : 1초 후 실행", 1000)
//   .then(() => {
//     setTimeoutSync("2. 두번째 작업 : 2초 후 실행", 1000);
//   })
//   .then(() => {
//     setTimeoutSync("3. 세번째 작업 : 3초 후 실행", 1000);
//   });

// setTimeout(() => {
//   console.log("1.안녕하세요.");
// }, 1000);
// setTimeout(() => {
//   console.log("2.안녕하세요.");
// }, 2000);
// setTimeout(() => {
//   console.log("3.안녕하세요.");
// }, 3000);
