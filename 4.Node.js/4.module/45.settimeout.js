//타이머를 통한 비동기 처리
console.log("1.타이머로 비동기");
setTimeout(() => {
  console.log("2.안녕하세요.");
}, 2000);
setTimeout(() => {
  console.log("3.안녕하세요.");
}, 1000);

console.log("4.모든 작업이완료되었습니다.");
// function greet() {
//   console.log("2.안녕하세요.");
// }

// setTimeout(greet, 2000);
// setTimeout(greet, 1000);
