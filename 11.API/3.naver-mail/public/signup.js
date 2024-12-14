function sendSignupRequest() {
  const email = document.getElementById("email").value;
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }
      return response.json();
    })
    .then((data) => {
      console.log("성공", data);
      document.getElementById("verify").style.display = "block";
      document.getElementById("signupResult").innerHTML = data.message;
    })
    .catch((error) => {
      console.error("오류", error);
      document.getElementById("signupResult").innerText = error.message;
    });
}

function sendVerifyRequest(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (email === "") {
    document.getElementById("signupResult").textContent =
      "이메일을 입력해주세요.";
    return;
  }
  if (code === "") {
    document.getElementById("signupResult").textContent =
      "인증코드를 입력해주세요.";
    return;
  }
  if (password !== password2) {
    document.getElementById("checkPass").textContent =
      "두 비밀번호가 일치하지 않습니다.";
    return;
  }
  fetch("/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, code: code }),
  })
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error("서버 응답 오류");
      // }
      return response.json();
    })
    .then((data) => {
      console.log("성공", data);
      document.getElementById("verificationResult").innerHTML = data.message;
      window.location.href = "/welcome";
    })
    .catch((error) => {
      console.error("오류", error);
      document.getElementById("verificationResult").innerText = error.message;
    });
}
