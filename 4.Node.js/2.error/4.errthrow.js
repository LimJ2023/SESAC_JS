function divide(a, b) {
  try {
    if (b === 0) throw new Error("0으로 나눌 수 없습니다.");
  } catch (err) {
    return "오류 발생 : " + err;
  }
  return a / b;
}

function divide2(a, b) {
    try {
      if (b === 0) throw new Error("0으로 나눌 수 없습니다.");
    } catch (err) {
      return "오류 발생 : " + err;
    }
    return a / b;
  }

console.log(divide(5, 0));
