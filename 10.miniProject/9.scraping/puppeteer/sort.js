const numbers = [5, 2, 9, 1];

console.log(numbers.sort((a, b) => a - b)); // 0이라면 두 값이 같음. 음수는 b가 크고 양수면 a가 큼

const fruits = ["banana", "apple", "orange"];
console.log(fruits);

fruits.sort((a, b) => (a > b ? 1 : -1));
console.log(fruits);
