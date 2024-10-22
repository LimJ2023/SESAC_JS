class MathOperations {
  static add(x, y) {
    return x + y;
  }
}
//객체를 생성, 실체화(instantiation)
// const sum = new MathOperations();

const sum = MathOperations.add(2, 4);
console.log(sum);
