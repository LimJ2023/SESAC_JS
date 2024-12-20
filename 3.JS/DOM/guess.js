document.addEventListener("DOMContentLoaded", function () {
  let result = document.getElementById("result");
  let count = 0;
  let inputnum = 0;
  const logElement = document.getElementById("log");
  const log = [{ count, inputnum }];
  //랜덤숫자 1~100까지 생성
  let rand = Math.floor(Math.random() * 100 + 1);
  console.log(rand);
  // guess버튼을 통해 입력숫자와 내 숫자를 확인
  const guessButton = document.getElementById("guessButton");

  function lowHigh() {
    const inputNum = document.getElementById("guessNum").value;
    console.log(inputNum);
    count++;
    log.push({ count: count, inputnum: inputNum });
    // log.push(`당신의 ${log.length + 1}번째 숫자는 ${inputNum}입니다.<br>`);
    //숫자가 높은지 too High낮은지too Low 알려준다 Correct.
    if (inputNum > rand) {
      result.textContent = "too High";
    } else if (inputNum < rand) {
      result.textContent = "too Low";
    } else if (inputNum == rand) {
      //미션2. 입력한 값들의 로그를 출력하기
      result.textContent = `Correct! 정답입니다!당신은 ${count}번째에 정답을 맞혔습니다!`;

      let temp = "";
      log.forEach((e) => {
        if (e.count !== 0) {
          temp += `당신의 ${e.count}번째 숫자는 ${e.inputnum}입니다.<br>`;
        }
      });
      console.log(temp + " 로그");

      logElement.innerHTML = temp;
    }
  }

  //미션3. 이 문제를 풀어가는 입장에서 최소화해서 푸는 방법이 뭔지 알아보기

  // 이진탐색. 분할 정복 알고리즘이다.

  guessButton.addEventListener("click", lowHigh);
});
