document.getElementById("name").addEventListener("blur", (e) => {
  console.log(e.target.value);
  const name = document.getElementById("name").value;
  // 글자수 체크
  if (name.length < 3 || name.length > 10) {
    e.target.classList.add("is-invalid");
    e.target.classList.remove("is-valid");
  } else {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  }
});

document.getElementById("password").addEventListener("blur", (e) => {
  const password = document.getElementById("password").value;
  // 비밀번호 체크
  //비밀번호 정규식 패턴 가져옴
  const patterns = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*]/,
  };
  if (password.length < 8 || !patterns.special.test(password)) {
    e.target.classList.add("is-invalid");
    e.target.classList.remove("is-valid");
  } else {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  }
});
document.getElementById("email").addEventListener("blur", (e) => {
  console.log(e.target.value);
  const email = document.getElementById("email").value;
  // @ 있나 없나
  if (!email.includes("@")) {
    e.target.classList.add("is-invalid");
    e.target.classList.remove("is-valid");
  } else {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  }
});

document.getElementById("checkbox").addEventListener("blur", (e) => {
  console.log(e.target);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const birthdate = formData.get("birth");

  console.log("get ", name, email, password);
});
