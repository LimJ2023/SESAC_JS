//살아있는 사람의 나이....

//이 함수를 호출하는 사람은 에러처리를 해야함(handling)
function checkAge(age) {
  if (age < 0 || age > 150) {
    throw new Error("유효하지 않은 나이입니다.");
  }
  return `나이는 ${age}입니다.`;
}

console.log(checkAge(10));
console.log(checkAge(50));
console.log(checkAge(99));

try {
  console.log(checkAge(199));
} catch (err) {
  console.log(err.message);
}
