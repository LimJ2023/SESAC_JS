const Car = class {
  //익명,실명 // 호이스팅 x
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
};

const myCar = new Car("르노", "sm5");
