const Person = require("./people/Person");
const person1 = new Person("나나나", 25, "남");

person1.eat();

const employee1 = new Employee("너너너1", 30, "여", "매니저", "5000000");
const employee2 = new Employee("너너너2", 31, "여", "5000000");
employee1.greet();
employee2.greet();
employee1.displayInfo();
employee2.displayInfo();

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
const manager1 = new Manager("수현", 35, "남", "팀장", 6000000, "개발");
manager1.assignTask();

class Customer extends Person {
  constructor(name, age, gender, customerId, orderHistory) {
    super(name, age, gender);
    this.customerId = customerId;
    this.orderHistory = orderHistory;
  }
  placeOrder(product) {
    console.log(`${this.name} 고객이 ${product}를 주문했습니다.`);
    this.orderHistory.push(product);
  }
  //주문 목록 조회
  printOrderHistory() {
    if (this.orderHistory.length === 0) {
      console.log("주문 목록이 없습니다.");
    } else {
      console.log(`${this.name}님의 주문 목록입니다.`);
      this.orderHistory.forEach((e) => {
        console.log(`- ${e}`);
      });
    }
    // join 함수. 전부 돌면서 인자값으로 구분시켜준다.
    // console.log(`주문 내역 : ${this.orderHistory.join("<br>")}`);
  }
  //오래된 기록 삭제
  removeOldProduct() {
    console.log(
      `${this.orderHistory.shift()}가 삭제되었습니다. 남은 목록은 ${
        this.orderHistory
      } 입니다. `
    );
  }
}
const student1 = new Student("학생1", 25, "남", 1, "컴퓨터공학");
const customer1 = new Customer("고객1", 30, "여", 2, ["커피", "라떼"]);

student1.study();
customer1.placeOrder("아메리카노");
customer1.printOrderHistory();
customer1.removeOldProduct();

console.log("========================================");

const people = [manager1, student1, customer1, employee1, employee2];
introducePeople(people);

function introducePeople(people) {
  for (let person of people) {
    person.greet();
  }
  for (let i = 0; i < people.length; i++) {
    people[i].walk(Math.floor(Math.random() * 10 + 1));
  }

  //이게 클래스를 만드는 이유인듯... 이렇게 쓰는게 좋다
  people.forEach((person) => {
    if (person instanceof Employee) {
      person.work();
    } else if (person instanceof Student) {
      person.study();
    }
  });
}
