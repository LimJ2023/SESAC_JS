const Person = require("./Person");

class Student extends Person {
  constructor(name, age, gender, stdId, major) {
    super(name, age, gender);
    this.stdId = stdId;
    this.major = major;
  }

  study() {
    console.log(`${this.name} 학생이 ${this.major}를 공부하고 있습니다.`);
  }
}

module.exports = Student;
