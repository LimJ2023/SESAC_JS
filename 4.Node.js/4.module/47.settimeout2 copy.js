console.log("0.타이머로 비동기");

setTimeout(() => {
  console.log("1.안녕하세요.");
}, 1000);
setTimeout(() => {
  console.log("2.안녕하세요.");
}, 2000);
setTimeout(() => {
  console.log("3.안녕하세요.");
}, 3000);

console.log("4.모든 작업이완료되었습니다.");
