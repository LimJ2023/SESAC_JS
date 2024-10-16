document.addEventListener("DOMContentLoaded", function () {
  const tds = document.getElementsByTagName("td");
  const inputNum = document.getElementById("inputNum");
  let result = " ";
  for (let i = 0; i < tds.length; i++) {
    tds[i].addEventListener("click", () => {
      let input = tds[i].innerText;
      switch (input) {
        case "+":
        case "-":
        case "*":
        case "/":
          console.log("연산자 진입 : " + result.slice(-1));
          if (result == " ") {
            console.log("아무것도 없을 때 계산할 수 없습니다.");
            inputNum.value = result;
            break;
          }
          //result에 공백 넣은 이유 :
          //이거 없으면 includes(result.slice(-1))<-얘가 터짐 (아마 슬라이스할 요소가 없으니까 터지는걸로 예상)
          //이거 해결 못해서 result 초기값에 공백 넣음 하
          if (result.length == 1 || "+-*/".includes(result.slice(-1))) {
            console.log("인클루드 진입 : ", result);
            result = result.slice(0, -1) + input;
            inputNum.value = result;
          } else {
            result = result + input;
            inputNum.value = result;
          }
          break;
        case "=":
          //여기에 공백 넣어줘야 초기세팅과 같아짐...
          result = eval(result) + " ";
          console.log("결과 : " + result);
          //infinity 뒤에 공백 넣어줘야 = 했을 때 문제 안생김 ㅋㅋ
          if (result == "Infinity ") {
            console.log("0으로 나눌 수 없습니다.");
            result = " ";
          }
          inputNum.value = result;
          break;
        case "C":
          result = " ";
          inputNum.value = " ";
          break;

        default:
          //이러니까 맨 처음 계산할 때 또 지워지는 문제가 생김
          // 뒤에 조건 하나 추가해서 처음 시도할때는 안하도록...
          if (result.slice(-1) === " " && result.length != 1) {
            console.log("공백 진입 " + result.slice(-1));
            result = result.slice(0, -1);
          }
          result = result + input;
          inputNum.value = result;
          console.log("결과 저장중 " + result);
          break;
      }
    });
  }
});
