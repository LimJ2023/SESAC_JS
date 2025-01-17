const form = document.getElementById("login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    console.log("이메일 : ", email.value, "비번", password.value);
    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    });
    const data = await response.json();
    console.log("로그인 시도 : ", data);
    switchForm(data.isLogin);
});

function switchForm(isLogin) {
    const loginLi = document.getElementById("login-li");
    const logoutLi = document.getElementById("logout-li");
    if (!isLogin) {
        loginLi.style.display = "block";
        logoutLi.style.display = "none";
    } else {
        loginLi.style.display = "none";
        logoutLi.style.display = "block";
    }
}
