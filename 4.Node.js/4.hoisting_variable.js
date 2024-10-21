console.log(a); // var 변수 자체는 호이스팅이 가능하나, 값은 초기화되지 않는다.
var a = 5;

console.log(b); // const, let은 호이스팅이 되지 않음. 사용 전에 선언을 해야 한다.
const b = 10;

//ReferenceError <- 참조 오류..
