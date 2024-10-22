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
  walk() {
    console.log(`${this.name}이 걷고 있습니다.`);
  }
  eat() {
    console.log(`${this.name}이 먹고 있습니다.`);
  }
}

const person1 = new Person("나나나", 25, "남");

person1.eat();

class Employee extends Person {
  constructor(name, age, gender, jobTitle, salary) {
    super(name, age, gender);
    this.jobTitle = jobTitle;
    this.salary = salary;
  }

  displayInfo() {
    console.log(
      `직원 ${this.name}의 직위는 ${this.jobTitle}, 급여는 ${this.salary}원 입니다.`
    );
  }
  work() {
    console.log(`${this.name}이 업무 중입니다.`);
  }
}

const employee1 = new Employee("너너너", 30, "여", "매니저", "50000");
employee1.greet();
employee1.displayInfo();

console.log(employee1 instanceof Employee);

class Manager extends Employee {
  constructor(name, age, gender, jobTitle, salary, team) {
    super(name, age, gender, jobTitle, salary);
    this.team = team;
  }
  assignTask() {
    console.log(`${this.name}매니저가 ${this.team}에 업무를 배분하고있습니다.`);
  }
}
const manager1 = new Manager("수현", 35, "남", "팀장", 60000, "개발");
manager1.assignTask();
