const Person = require("./Person");
class Child extends Person {
  constructor(name, age, gender, grade) {
    super(name, age, gender);
    this.grade = grade;
  }
  playInCar() {
    console.log(`${this.name}이(가) 차 안에서 노는 중입니다.`);
  }
  sing() {
    console.log(`${this.age}살의 ${this.name}이 노래를 부릅니다...`);
  }
}
module.exports = Child;
