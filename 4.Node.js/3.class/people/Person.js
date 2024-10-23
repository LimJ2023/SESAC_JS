class Person {
  constructor(name, age, gender) {
    // attribute / Properties
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  // method.
  greet() {
    console.log(`안녕 나는 ${this.name}이고 ${this.age}살이야.`);
  }
  walk(distance) {
    console.log(`${this.name}이 ${distance}만큼 걷고 있습니다.`);
  }
  eat() {
    console.log(`${this.name}이 먹고 있습니다.`);
  }
}
module.exports = Person;
