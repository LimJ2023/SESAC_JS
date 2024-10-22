console.log(multiply(4, 2));

function multiply(x, y) {
  return x * y;
}

//호이스팅의 주의점. 변수에 함수를 담으면? <--호이스팅이 안 됨...
console.log(multiply2(4, 2));

const multiply2 = function (x, y) {
  return x * y;
};
