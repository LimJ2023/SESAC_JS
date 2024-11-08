document.addEventListener("DOMContentLoaded", () => {
  // const form = document.getElementById("form");
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   const username = document.getElementById("username").value;
  //   const password = document.getElementById("password").value;
  //   fetch("/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //   });
  // });

  async function checkLoginStatus() {
    try {
      const res = await fetch("/check-login");
      const data = await res.json();

      if (data && data.username) {
        if (data.isLogin) {
          document.getElementById("login").style.display = "none";
          document.getElementById("logout").style.display = "inline-block";
        } else {
          document.getElementById("login").style.display = "inline-block";
          document.getElementById("logout").style.display = "none";
        }
      }
    } catch (error) {
      console.log("에러~", err.message);
    }
  }
  checkLoginStatus();
});
