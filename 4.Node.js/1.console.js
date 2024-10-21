const greeting = "hello world!";

console.log(greeting);

const a = 10;
const b = 20;
const c = "text";
console.log(a, b, c);
console.log(`입력값들은 a=${a}, b=${b}, c=${c}`);

// 객체

const person = {
  name: "yhLim",
  age: 30,
};
console.log(person);
console.log(person.address); // 없는 멤버는 undefined가 나옴! 배열도 마찬가지.

//성능 측정원할때...

console.time("test");
console.timeEnd("test");

//쿠팡찍기

var color = {
  brown: "color:#560000;font-size:11px;",
  red: "color:#d83128;font-size:11px;",
  yellow: "color:#ea991b;font-size:11px;",
  green: "color:#93ba2f;font-size:11px;",
  blue: "color:#4da4e0;font-size:11px;",
};
console.log(
  "%c   ____                                    \
    \n%c  / ___|___  _   _ %c_ __   %c__ _ %c_ __   %c__ _ \
    \n%c | |   / _ \\| | | %c| '_ \\ %c/ _` %c| '_ \\ %c/ _` | \
    \n%c | |__| (_) | |_| %c| |_) %c| (_| %c| | | | %c(_| | \
    \n%c  \\____\\___/ \\__,_%c| .__/ %c\\__,_%c|_| |_|%c\\__, | \
    \n%c                  %c|_|                %c|___/ \
    \n      %cLife is too short, you need cou%cp%ca%cn%cg.\n",
  color.brown,
  color.brown,
  color.red,
  color.yellow,
  color.green,
  color.blue,
  color.brown,
  color.red,
  color.yellow,
  color.green,
  color.blue,
  color.brown,
  color.red,
  color.yellow,
  color.green,
  color.blue,
  color.brown,
  color.red,
  color.yellow,
  color.green,
  color.blue,
  color.brown,
  color.red,
  color.blue,
  color.brown,
  color.red,
  color.yellow,
  color.green,
  color.blue
);
