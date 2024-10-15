// ---------------사칙연산하는 함수 만들기

function add(num1, num2) {
  return num1 + num2;
}
const subtract = function (a, b) {
  return a - b;
};
const division = (a, b) => {
  if (b == 0) {
    console.log("분모를 0으로 할 수 없습니다.");
    return;
  }
  return a / b;
};
const multiply = (a, b) => a * b;

console.log("2 + 4 = ", add(2, 4));
console.log("2 - 4 = ", subtract(2, 4));
console.log("2 * 4 = ", multiply(2, 4));
console.log("2 / 4 = ", division(2, 0));
