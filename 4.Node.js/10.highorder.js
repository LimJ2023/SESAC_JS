function doSomething(func) {
  console.log("이 일을 끝내고 나서...");
  //그 다음 호출하기
  func();
}

function sayHello() {
  console.log("안녕하세요?");
}
//함수를 인자로 받는 고차함수
doSomething(sayHello);

//함수를 반환하는 고차함수
function createMultiplyer(multiply) {
  return function (x) {
    return x * multiply;
  };
}
const double = createMultiplyer(4);
console.log(double(2));

//JS에서 이런 형태로 만들어진 함수들이 있음..
