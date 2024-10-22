class Circle {
  constructor(radius) {
    //_ 이건 내부에서만 쓸 것이라는 말.
    this._radius = radius;
  }
  //함수처럼 생겼지만? 변수처럼 취급함..
  get diameter() {
    return this._radius * 2;
  }
  set diameter(diameter) {
    this._radius = diameter / 2;
  }
}

const myCircle = new Circle(5);
myCircle.diameter = 14;
console.log(myCircle._radius);
