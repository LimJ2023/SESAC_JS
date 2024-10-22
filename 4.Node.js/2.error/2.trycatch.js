// 참조 오류
try {
  const undefinedVar = 10;
  console.log(undefinedVar);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log("참조 오류가 발생했습니다.", error.message);
  } else {
    console.log("알수없는 오류가 발생했습니다.");
  }
}

//구문 오류
try {
  sum = eval("1+2");
  console.log(sum);
} catch (err) {
  if (err instanceof SyntaxError) {
    console.log("입력받은 문법에 오류가 있습니다.", err.cause);
  }
  console.log("알 수 없는 오류", err);
}

// 타입 오류
try {
  let obj = null;
  //   obj.method();
} catch (err) {
  if (err instanceof TypeError) {
    console.log("타입 오류가 발생했습니다.", err.message);
  } else console.log("오류발생", err);
}

//범위 오류

try {
  let array = new Array(-1);
} catch (err) {
  if (err instanceof RangeError) {
    console.log("범위 오류 발생", err.message);
  }
}

//실무적인 코드란? 3.trycatch에서..
