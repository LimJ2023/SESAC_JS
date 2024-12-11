function sendSignupRequest() {
  const email = document.getElementById("email").value;
  document.getElementById("emailVerify").value = email;
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

function sendVerifyRequest() {
  const email = document.getElementById("emailVerify").value;
  const code = document.getElementById("code").value;

  fetch("/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, code: code }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }
      return response.json();
    })
    .then((data) => {
      console.log("성공", data);
      document.getElementById("verificationResult").innerHTML = data.message;
    })
    .catch((error) => {
      console.error("오류", error);
      document.getElementById("verificationResult").innerText = error.message;
    });
}
