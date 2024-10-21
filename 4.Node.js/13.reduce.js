//reduce 함수는 전체 배열 내의 데이터를 합산(누산)...저장하여accumulator
// 하나의 값으로 반환함

const numbers = [-1, -90, -40, -50, -7, -9, -2, -3, -4, -5, -10, -20, -30];
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum);

const max = numbers.reduce((acc, cur) => {
  if (acc <= cur) {
    return cur;
  } else {
    return acc;
  }
}, 0);
console.log("최대값은?", max);

//내가 max 함수를 구현한다면?

function myMax(numbers) {
  let max = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (max < numbers[i]) {
      max = numbers[i];
    }
  }
  return max;
}
console.log(myMax(numbers));

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
  {
    name: "Emma",
    age: 20,
  },
];

const groupByage = function (objArray, property) {
  return objArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};
console.log(groupByage(people, "age"));
