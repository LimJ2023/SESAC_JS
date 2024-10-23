class Car {
  constructor(name) {
    this.name = name;
  }

  //Object 클래스의 속성을 오버라이딩.
  toString() {
    return "문자열로 변환될 때는 이걸 출력하게 됨.";
  }
}

const myCar = new Car("모닝");
const myCar2 = new Car("테슬라");

console.log(myCar);
console.log("내 차는 " + myCar); // 객체를 문자열로 변환시켜서 더해버림.
console.log("내 차는 ", myCar); //이건 각각별개로 출력하는 중
console.log(`내 차는 ${myCar}`); //문자열로 변환시킴 얘도.

// [object Object] 는 객체를 문자열로 바꿀 때 나오는 현상
// Car <-- Object.prototype.toString();
// implicit type coretion (암묵적 타입 변환);
