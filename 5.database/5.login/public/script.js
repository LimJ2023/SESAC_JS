document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const url = data.url;
        window.location.href = url;
      } else {
        console.log(response.status);
        document.getElementById("login-fail").style.display = "block";
      }
    } catch (error) {
      console.log("진입");
      console.log("스테이터스 401");
    }
  });
});
