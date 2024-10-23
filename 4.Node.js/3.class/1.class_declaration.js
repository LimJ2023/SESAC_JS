// class Car {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//   }

//   drive2() {
//     return `${this.make}의 ${this.model} 이 움직이는 중입니다.`;
//   }
// }

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  drive() {
    return `${this.make}의 ${this.model} 이 주행 중입니다.`;
  }
  open() {
    return `${this.make}의 문이 열렸습니다.`;
  }
  close() {
    return `${this.make}의 문이 닫혔습니다.`;
  }
}

const myCar = new Car("현대", "g80");
const myCar2 = new Car("기아차", "모닝");
console.log(myCar.drive());
console.log(myCar2.drive());
// console.log(myCar.open());
// console.log(myCar.close());
