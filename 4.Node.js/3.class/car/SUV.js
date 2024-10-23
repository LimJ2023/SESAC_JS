const Car = require("./Car");

class SUV extends Car {
  offRoad() {
    console.log(
      `${this.brand}의 ${this.color}색상의 ${this.model}이(가) 비포장 길을 달립니다.`
    );
  }
}

module.exports = SUV;
