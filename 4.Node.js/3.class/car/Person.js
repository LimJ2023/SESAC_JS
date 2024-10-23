class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet() {
    console.log(
      `안녕 내이름은 ${this.name}이고 나이는 ${this.age}야 난 ${this.gender}야 ㅎㅎ`
    );
  }
  getInCar(car) {
    console.log(`${this.name}이(가) ${car.model}에 탑승합니다.`);
    car.pickUpPassenger();
  }
}

module.exports = Person;
