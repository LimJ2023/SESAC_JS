function greet(name) {
  console.log("안녕, " + name);
}

greet("요한1");
greet("Kim");
greet("Park");

function add(num1, num2) {
  return num1 + num2;
}
add(2, 3);
add(5, 10);

let sum = add(2, 5);
console.log(sum);
console.log(add(1, 8));

console.log(minus(3, 2));

const multi = (a, b) => a * b;

console.log(multi(2, 3));

// ---------------사칙연산하는 함수 만들기

// function add(num1, num2) {
//   return num1 + num2;
// }
// const subtract = function (a, b) {
//   return a - b;
// };
// const division = (a, b) => {
//   return a / b;
// };
// const multi = (a, b) => a * b;

// console.log("1 + 4 ", add(1, 4));
// console.log("1 - 4 ", subtract(1, 4));
// console.log("1 * 4 ", multi(1, 4));
// console.log("1 / 4 ", division(1, 4));
