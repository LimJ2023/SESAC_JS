const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => {
  if (b === 0) return "0으로 나눌 수 없습니다.";
  return a / b;
};

module.exports = { add, sub, mul, div };
