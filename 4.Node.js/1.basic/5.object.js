//변수에 담는 {} 는 Object 객체, class{}에 담는건 Class 객체

const car = {
  brand: "현대",
  year: 2024,
  start: function () {
    return "스타트";
  },
};

console.log(car);
console.log(car.start()); //함수를 부름. 리턴값 반환
console.log(car.start); // 변수를 부름. [function: start]를 반환

car.name = "k5"; //객체에 멤버 추가 가능.
console.log(car);
