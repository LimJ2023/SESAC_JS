const arr1 = [1, 2, 3];
const fruits = ["apple", "banana", "orange"];
const mixed = [1, "hello", true, null, { key: "value" }];

console.log(arr1[0]);
console.log(fruits[2]);
console.log(mixed.length);
console.log(fruits[fruits.length - 1]);

// 배열 순회, for문
for (let i = 0; i < arr1.length; i++) {
  console.log(arr1[i]);
}
fruits.forEach(function (fruit) {
  console.log(fruit);
});

fruits.forEach((f) => {
  console.log(f);
});
for (let fruit of fruits) {
  console.log(fruit);
}

const length = arr1.push(4);
arr1.push(5);
console.log(length);

console.log(arr1.pop());

console.log("=======================");

const slicedArray = fruits.slice(1, 3);
console.log(slicedArray);

const slicedNumbers = arr1.slice(2, 4);
console.log(slicedNumbers);

// slice는 원본을 건드리지 않음.
// splice는 원본을 건드린다.!!!!!!!!!!!!!
const removedElements = arr1.splice(1, 2);
console.log("스플라이스 : ", removedElements);
console.log(arr1);

//배열 합치기
const arr2 = [1, 2, 3];
const arr3 = [4, 5, 6];
const arr4 = [7, 8, 9];
//원본은 그대로 남음
const mergedArray = arr2.concat(arr3, arr4);
console.log(mergedArray);

const mergedArraywithSpread = [...arr2, ...arr3];
console.log(mergedArraywithSpread);

const originalArray = [1, 2, 3];
const elementInsert = [4, 5, 6];

//1번 인덱스부터 0개를 삭제하고 그 자리에 새 엘리먼트를 ...로 삽입
originalArray.splice(1, 0, ...elementInsert);
console.log(originalArray);
