class Shape {
  constructor(base) {
    this.base = base;
    this.area = 0;
    this.shape = "";
  }
  getArea() {
    throw new Error("getArea() 구현하세요~!");
  }
  getInfo() {
    throw new Error("getInfo() 구현하세요~!");
  }
  toString() {
    return `${this.shape} - Area: ${this.getArea().toFixed(2)} m²`;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
    this.shape = "square";
  }
  getArea() {
    this.area = this.side ** 2;
    return this.area;
  }
  getInfo() {
    return `${this.shape} with side length ${this.side}.`;
  }
}
class Triangle extends Shape {
  constructor(base, height) {
    super(base);
    this.height = height;
    this.shape = "triangle";
  }
  getArea() {
    this.area = (this.base * this.height) / 2;
    return this.area;
  }
  getInfo() {
    return `${this.shape} with base ${this.base}, height ${this.height}.`;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
    this.shape = "circle";
  }
  getArea() {
    this.area = this.radius ** 2 * Math.PI;
    return this.area;
  }
  getInfo() {
    return `${this.shape} with radius ${this.radius}.`;
  }
}
class Trapezium extends Shape {
  constructor(base, base2, height) {
    super(base);
    this.base2 = base2;
    this.height = height;
    this.shape = "trapezium";
  }
  getArea() {
    this.area = (1 / 2) * (this.base + this.base2) * this.height;
    return this.area;
  }
  getInfo() {
    return `${this.shape} with base1 ${this.base}, base2 ${this.base2} and height ${this.height}.`;
  }
}

const square = new Square(5);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(3);

// console.log("Square Area:", square.getArea()); // 출력: 25
// console.log("Triangle Area:", triangle.getArea()); // 출력: 6
// console.log("Trapezium Area:", trapezium.getArea()); // 출력: 25
// console.log("Circle Area:", circle.getArea().toFixed(2)); // 출력: 28.27

// Square with side length 5. Area: 25
console.log(square.getInfo(), "Area:", square.getArea());
// Triangle with base 4 and height 3. Area: 6
console.log(triangle.getInfo(), "Area:", triangle.getArea());
// Trapezium with base1 4, base2 6, and height 5. Area: 25
console.log(trapezium.getInfo(), "Area:", trapezium.getArea());
// Circle with radius 3. Area: 28.27
console.log(circle.getInfo(), "Area:", circle.getArea().toFixed(2));

//toString()으로 오버라이딩
// console.log(`${square}`);
// console.log(`${triangle}`);
// console.log(`${trapezium}`);
// console.log(`${circle}`);
