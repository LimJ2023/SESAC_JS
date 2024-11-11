import checkLoginStatus from "./checkuser.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault();
    login();
    checkLoginStatus();
  });
  checkLoginStatus();
});

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((responce) => {
      if (responce.ok) {
        //로그인 성공
        return responce.json();
      } else {
        //로그인 실패
        throw new Error("로그인 실패");
      }
    })
    .then((data) => {
      showProfile(data.username);
    })
    .catch((err) => {
      showLoginForm();
    });
}
function showProfile(username) {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("usernameSpan").innerText = `${username}`;
}
function showLoginForm() {
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("profile").style.display = "none";
}
