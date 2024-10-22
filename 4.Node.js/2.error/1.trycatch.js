// 과거 언어는 예외처리를 if/else로 했다...
// 모던 언어는 : java이후(pyothon)는 try/catch를 지원
// const undefinedVariable = 10;
try {
  const result = undefinedVariable * 2;
  console.log(result);
} catch (err) {
  console.log("변수가 없음");
  console.error("오류가 발생했음.. 아 몰라", err);
}
