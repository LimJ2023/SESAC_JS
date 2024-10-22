try {
  const scores = [90, 95, 80, 88, "1000"]; //국영수과음
  let sum = 0;
  if (scores.length <= 0) throw new Error("점수 값이 존재하지 않습니다.");

  for (let i = 0; i < scores.length; i++) {
    if (typeof scores[i] !== "number")
      throw new Error(
        `숫자가 아닌 값이 입력되었습니다 입력된 문자열 : ${scores[i]}, ${i}번째 입력값}`
      );
    sum += scores[i];
  }

  const average = sum / scores.length;
  if (!average) throw new Error("평균 계산에 문제 발생");

  if (average >= 80) {
    console.log("합격입니다.");
  } else {
    console.log("불합격입니다.");
  }
  console.log("평균점수는", average);
} catch (error) {
  console.log("오류가 발생했습니다. 관리자에게 문의하세요. ", error.message);
}
