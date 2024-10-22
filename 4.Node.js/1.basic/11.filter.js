const numbers = [10, 15, 20, 25, 30];
function aboveTwentyCondition(n) {
  if (n > 20) return true;
  else return false;
}
function belowTwentyCondition(n) {
  if (n <= 20) return true;
  else return false;
}
//조건에 맞는 요소들만 반환해준다.
const aboveTwenty = numbers.filter(aboveTwentyCondition);
const belowTwenty = numbers.filter(belowTwentyCondition);

console.log(aboveTwenty);

const aboveTwenty2 = numbers.filter((n) => (n > 20 ? true : false));
//이거 멋있네 트루펄스 바로 반환
const aboveTwenty3 = numbers.filter((n) => n > 20);
const belowTwenty2 = numbers.filter((n) => (n <= 20 ? true : false));
console.log(aboveTwenty2);
console.log(belowTwenty2);

// --------------------------------------------

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const evenNumbers = numbers2.filter((n) => {
  if (n % 2 === 0) return n;
});
const evenNumbers2 = numbers2.filter((n) => n % 2 === 0);
console.log(evenNumbers2);

const oddNumbers = numbers2.filter((n) => {
  if (n % 2 !== 0) return n;
});
const oddNumbers2 = numbers2.filter((n) => n % 2 !== 0);
console.log(oddNumbers);

// =======================

//특정 문자열 필터링하기
const words = [
  "apple",
  "banana",
  "grape",
  "blueberry",
  "avocado",
  "오렌지",
  "사과",
  "포도",
  "수박",
];

const containsA = words.filter((word) => word.includes("a"));
const containsA3 = words.filter((word) => word.endsWith("y"));
const containsA2 = words.filter((word) => {
  for (char of word) {
    if (char === "a") return true;
  }
  //forEach 안됨. 왜??
  // 문자열은 array가 아니다. 그래서 forEach를 쓸 수 없음.
  // 쓰려면 [...word].foreach()를 이용!
});
const contains2chars = words.filter((c) => {
  if (c.length === 2) {
    return c;
  }
});
console.log(containsA);
console.log(containsA2);
console.log(contains2chars);

// 객체 배열에서 무언가를 골라내고 싶다면?

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

const adults = people.filter((p) => p.age >= 30);
console.log(adults);

const people2 = [
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
  },
  {
    name: "David",
    age: 35,
  },
];

const unknownAge = people2.filter((p) => !p.age);
const unknownAge2 = people2.filter((p) => !p.hasOwnProperty("age"));

console.log(unknownAge);
console.log(unknownAge2);
