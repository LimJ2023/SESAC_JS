try {
  undefinedFunc();
} catch (err) {
  if (err instanceof TypeError) {
    console.log("타입 오류입니다.", err.message);
  } else if (err instanceof ReferenceError) {
    console.log("참조 오류", err.message);
  } else if (err instanceof RangeError) {
    console.log("범위 오류", err.message);
  } else {
    console.log("기타 오류", err.message);
  }
}
