class Car {
  constructor(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.passengerNumber = 0;
  }

  start() {
    console.log(
      `${this.brand}의 ${this.color}색상의 ${this.model}이(가) 출발합니다.`
    );
  }
  stop() {
    console.log(
      `${this.brand}의 ${this.color}색상의 ${this.model}이(가) 정지합니다.`
    );
    console.log(
      `${this.model} 차의 현재 탑승 인원은 ${this.passengerNumber}명 입니다.`
    );
  }
  drive() {
    console.log(
      `${this.brand}의 ${this.color}색상의 ${this.model}이(가) 운행중입니다.`
    );
  }
  pickUpPassenger() {
    this.passengerNumber++;
    console.log(
      `${this.model} 차의 현재 탑승 인원은 ${this.passengerNumber}명 입니다.`
    );
  }
  dropPassenger() {
    this.passengerNumber--;
    console.log(
      `${this.model} 차의 현재 탑승 인원은 ${this.passengerNumber}명 입니다.`
    );
  }
  chageCar(car) {
    car.passengerNumber = this.passengerNumber;
    console.log(`${car.name}`);
  }
}

module.exports = Car;
