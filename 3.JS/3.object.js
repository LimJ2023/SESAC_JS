const person = {
  name: "요한",
  age: 30,
  address: "동대문구 외대앞",
  greet: function () {
    console.log("안녕하세요, 저는 " + this.name + "입니다.");
  },
};

console.log("이 사람의 이름 : ", person.name);
console.log("이 사람의 나이 : ", person.age);
console.log("이 사람의 주소 : ", person.address);
console.log(person.greet());
