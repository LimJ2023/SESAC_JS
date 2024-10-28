class Calculator {
  add(a, b) {
    return a + b;
  }
  sub(a, b) {
    return a - b;
  }
  mul(a, b) {
    return a * b;
  }
  div(a, b) {
    if (b === 0) return "0으로 나눌 수 없습니다.";
    return a / b;
  }

  calculator(num1, operator, num2) {
    switch (operator) {
      case "+":
        return this.add(num1, num2);
      case "-":
        return this.sub(num1, num2);
      case "*":
        return this.mul(num1, num2);
      case "/":
        return this.div(num1, num2);

      default:
        return "invalid operator";
    }
  }
}

class StandardCalc extends Calculator {
  //제곱근,반올림 등
  sqrt(a, b) {
    return a.sqrt(b);
  }
  round(a) {
    return Math.round(a);
  }
  square(a) {
    return a * a;
  }
}
class ProgrammerCalc extends Calculator {
  //비트 연산 논리 연산 등
  bitWiseAnd(a, b) {
    return a & b;
  }
  bitWiseOr(a, b) {
    return a | b;
  }
  bitWiseXor(a, b) {
    return a ^ b;
  }
  bitWiseNot(a) {
    return ~a;
  }
}

module.exports = { StandardCalc, ProgrammerCalc, Calculator };
