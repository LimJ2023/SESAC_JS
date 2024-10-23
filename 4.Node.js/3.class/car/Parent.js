const Person = require("./Person");
class Parent extends Person {
  constructor(name, age, gender) {
    super(name, age, gender);
  }

  driveCar(car) {
    console.log(`${this.name}이(가) ${car.model}을 운전중입니다.`);
  }
}

module.exports = Parent;
