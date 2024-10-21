//map은 멤버 모두에게 원하는 함수 내용을 적용하고 싶을 때.

const numbers = [1, 2, 3, 4, 5];

const doubleNumber = numbers.map((n) => n * 2);

console.log(doubleNumber);

const squared = numbers.map((n) => n * n);
console.log(squared);

const people = [
  {
    name: "Alice",
    age: 25,
  },
  {
    name: "Bob",
    age: 30,
  },
  {
    name: "Charlie",
    age: 20,
  },
  {
    name: "David",
    age: 35,
  },
];

//맵을 통해서 사람들의 이름만 가져오기

const names = people.map((p) => p.name);
console.log(names);

//퀴즈1
const fruits = ["apple", "banana", "grape"];
//좌우를 li 태그로 감싸기
const htmlTags = fruits.map((e) => (e = `<li>${e}</li>`));

console.log(htmlTags);

// 퀴즈2

const apiData = [
  { id: 1, firstName: "John", lastname: "doe" },
  { id: 2, firstName: "Jane", lastname: "Smith" },
];

const fullName = apiData.map(
  (user) => user.firstName.concat(" ", user.lastname)
  //`${user.firstName} ${user.lastname}`
);

console.log(fullName);
