const Car = require("./Car");

class Sedan extends Car {
  constructor(brand, model, color, distance) {
    super(brand, model, color);
    this.distance = distance;
  }
  openTrunk() {
    console.log(
      `${this.brand}의 ${this.color}색상의 ${this.model}이(가) 트렁크를 열었습니다.`
    );
  }
}

module.exports = Sedan;
