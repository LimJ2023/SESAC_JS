document.addEventListener("DOMContentLoaded", () => {
  console.log("js 파일 읽음");
  loadProfile();
  logout();
});

async function loadProfile() {
  try {
    const response = await fetch("/profile-data");
    if (response.ok) {
      try {
        const data = await response.json();
        document.getElementById("username").innerText = data.username;
        document.getElementById("email").innerText = data.email;
        document.getElementById("created_at").innerText = data.created_at;
        document.getElementById("role").innerText = data.role;
      } catch (error) {}
    } else {
      console.log("로그인 중 오류 : ", response.json());
    }
  } catch (error) {}
}

async function logout() {
  document.getElementById("logout").addEventListener("click", async () => {
    try {
      await fetch("/logout");
      alert("로그아웃 성공");
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  });
}
