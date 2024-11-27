// JavaScript for Bootstrap validation
(() => {
  "use strict";
  // 모든 폼을 가져옵니다.
  const forms = document.querySelectorAll(".needs-validation");

  // 각 폼에 유효성 검사를 추가합니다.
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        const password = document.getElementById("password").value;
        const resultDiv = document.getElementById("result");
        let isValid = false;
        //비밀번호 정규식 패턴 가져옴
        const patterns = {
          length: /.{8,}/,
          uppercase: /[A-Z]/,
          lowercase: /[a-z]/,
          number: /[0-9]/,
          special: /[!@#$%^&*]/,
        };

        if (patterns.special.test(password) && patterns.length.test(password)) {
          isValid = true;
          document.getElementById("password").classList.add("is-valid");
        } else {
          document.getElementById("password").classList.add("is-invalid");
          document.getElementById("password").classList.remove("is-valid");
        }

        //실패했을 때.
        if (!form.checkValidity() || !isValid) {
          event.preventDefault(); // 기본 동작 막기
          event.stopPropagation(); // 이벤트 전파 막기
        } else {
          //성공시 출력
          resultDiv.innerHTML = `
          <h5>결과 출력 완료!</h5>
          <p>email : ${email}</p>
          <p>password : ${password}</p>
          `;
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const form = document.getElementById("form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const birthdate = formData.get("birth");

  // 아이디
  if (name.length < 3 || name.length > 10) {
    // 수동 비활성화 상태
    document.getElementById("name").classList.add("is-invalid");
  }
  //비밀번호 정규식 패턴 가져옴
  const patterns = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*]/,
  };
  if (patterns.special.test(password) && patterns.length.test(password)) {
    resultDiv.innerHTML = `
              <h5>결과 출력 완료!</h5>
              <p>email : ${email}</p>
              <p>password : ${password}</p>
              `;
  } else {
    document.getElementById("password").classList.add("is-invalid");
  }
});
