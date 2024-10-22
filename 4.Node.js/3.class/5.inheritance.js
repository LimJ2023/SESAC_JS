class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return "동물소리";
  }
}

class Dog extends Animal {
  makeSound() {
    return "우월루어러ㅜ우어워워울ㄹ";
  }
  walk() {
    return `${this.name} 이 걷고 있습니다.`;
  }
}

const myDog = new Dog("대쪽이");
console.log(myDog.makeSound());
console.log(myDog.walk());
