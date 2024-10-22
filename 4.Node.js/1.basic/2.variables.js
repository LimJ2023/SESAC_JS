let a = 10;
let pi = 3.14;

let sum = a + pi;

console.log(sum);
const gravity = 9.81;

// gravity = 10;

let isLogged = false;

if (isLogged) {
  console.log("사용자가 로그인 되었습니다.");
} else {
  console.log("로그인이 필요합니다.");
}

//변수의 스코프
var globalA = 10; //전역변수 var. 백엔드에선 권장하지 않음
let globalB = 20; // BE에서의 글로벌 변수

function myfunc() {
  let localC = 30; //얜 로컬 변수임
  console.log(`글로벌a : ${globalA}, 글로벌b : ${globalB}, 로컬c : ${localC}`);
}
myfunc();
