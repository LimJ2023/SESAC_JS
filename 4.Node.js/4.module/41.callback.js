function greet(name, callback) {
  const message = "안녕 " + name;
  callback(message);
}

function displayGreeting1(greeting) {
  console.log(greeting);
}
function displayGreeting2(greeting) {
  console.log(`<h1>${greeting}</h1>`);
}
greet("홍길동", displayGreeting1);

function add(a, b, callback) {
  const sum = a + b;
  callback(a, b, sum);
}
function displaysum(a, b, value) {
  console.log(a, b, "두 수의 합은 : ", value);
}

add(1, 3, displaysum);
