const Employee = require("./Employee");
const Student = require("./Student");

const employee = new Employee("영희", 25, "여자", "직원", 10000);
const student = new Student("철수", 30, "남자", "c123", "법학");

employee.greet("대표");
student.greet("교수");
