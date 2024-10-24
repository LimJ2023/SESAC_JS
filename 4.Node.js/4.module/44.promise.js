//콜백 헬을 해결하기 위해 나온 프로미스.

const myPromise = new Promise((resolve, reject) => {
  //비동기 작업 수행을 함...
  //비동기 작업이 완료되면 resolve()를 반환
  //실패하면 reject()를 호출.
});

myPromise
  .then(() => {
    //성공시 코드
    setTimeout(() => {
      console.log("Operation completed1");
    }, 1000);
  })
  .then(() => {
    //첫번째 실행 뒤 두번째로 실행되는 코드.
    setTimeout(() => {
      console.log("Operation completed2", responce);
    }, 1000);
  })
  .catch((err) => {
    //실패했을 때의 코드.
    console.log("실패했을 때의 코드");
  });

function asyncOperation1(result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Operation completed");
      resolve(result);
    }, 1000);
  });
}
function asyncOperation2(responce) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Operation completed");
      resolve(responce);
    }, 1000);
  });
}

//

asyncOperation1()
  .then((responce1) => asyncOperation2(responce1))
  .then((responce2) => asyncOperation1(responce2))
  .then((responce3) => asyncOperation2(responce3))
  .then((responce4) => {
    console.log("Final Result ", responce4);
  })
  .catch((error) => {
    console.log("에러 발생", error);
  });

// async await 문법

async function executeQperations() {
  try {
    const responce1 = await asyncOperation1("작업물...");
    const responce2 = await asyncOperation2(responce1);
    const responce3 = await asyncOperation1(responce2);
    const responce4 = await asyncOperation2(responce3);
    console.log("final responce : ", responce4);
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}
executeQperations();
