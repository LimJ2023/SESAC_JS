function checkLoginStatus() {
  fetch("/api/check-login")
    .then((res) => {
      return res.json();
    })
    .then((userData) => {
      console.log("유저 체크 : ", userData);
      if (userData.username) {
        document.getElementById("user-info").innerHTML = `
          ${userData.username} 님
          <button  class="logout-btn" id="logout">Logout</button>`;
        document.getElementById("user-info").style.display = "block";
        document.getElementById("logout").addEventListener("click", () => {
          logout();
        });
      }
    });
}
function logout() {
  fetch("/api/logout")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("로그아웃 도중 오류");
      }
    })
    .then((data) => {
      window.location.href = data.redirectUrl;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export default checkLoginStatus;
