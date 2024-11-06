document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", handleFormsumbit);
  loadAllUsers();
});
function loadAllUsers() {
  fetch("/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
    } else {
      console.log("에러");
    }
  });
}
function handleFormsumbit(event) {
  event.preventDefault();
  const userId = document.getElementById("username");
  if (!userId.value) {
    alert("등록할 아이디를 입력해주세요.");
    return;
  }
  registerUser(userId);
}
function registerUser(userId) {
  fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId.value,
      name: userId.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("res : ", response);
        window.alert("등록 성공!");
      }
      userId.value = "";
      return response.json();
    })
    .then((data) => {
      displayUser(data);
    })
    .catch((error) => {
      alert("등록 중 오류 발생했습니다.");
      console.log(error);
    });
}

function displayUser(data) {
  //객체 분해
  const { id: userId, name: userName } = data;

  const table = document.getElementById("userTable");
  let div = document.createElement("div");
  div.className = userId;
  div.classList.add("userInfo");
  div.innerHTML = `            
          <span>Id: </span><p>${userId}</p><span>Name: </span><p>${userName}</p>
      `;

  const editButton = document.createElement("button");
  const delButton = document.createElement("button");
  editButton.textContent = "수정";
  delButton.textContent = "삭제";
  delButton.addEventListener("click", () => {
    let isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (isDelete) {
      deleteUser(userId, div);
    }
    return;
  });
  editButton.addEventListener("click", () => {
    editUser(userId, div);
  });
  table.appendChild(div);
  div.appendChild(editButton);
  div.appendChild(delButton);
}
function updateUsers() {
  fetch("/user")
    .then((responce) => responce.json())
    .then((users) => {
      console.log("users : ", users);
      const userTable = document.getElementById("userTable");
    })
    .catch((error) => {
      console.log("사용자 불러오는데 실패", error);
      alert("사용자 로딩 오류");
    });
}
function editUser(userId, div) {
  const inputName = window.prompt("이름을 입력해주세요.");
  if (!inputName) {
    alert("수정할 아이디를 입력해주세요.");
    return;
  }
  fetch("/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
      inputName: inputName,
    }),
  })
    .then((responce) => {
      return responce.json();
    })
    .then((data) => {
      let id = data.id;
      let name = data.name;
      div.innerHTML = `<span>Id: </span><p>${id}</p><span>Name: </span><p>${name}</p>`;
      const editButton = document.createElement("button");
      const delButton = document.createElement("button");
      editButton.textContent = "수정";
      delButton.textContent = "삭제";
      delButton.addEventListener("click", () => {
        let isDelete = window.confirm("정말 삭제하시겠습니까?");
        if (isDelete) {
          deleteUser(userId, div);
        }
        return;
      });
      editButton.addEventListener("click", () => {
        editUser(userId, div);
      });
      div.appendChild(editButton);
      div.appendChild(delButton);
    });
  return;
}
function deleteUser(userId, div) {
  fetch("/user", {
    method: "DELETE",
    body: JSON.stringify({ id: userId }),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => div.remove())
    .catch((error) => {
      console.log("삭제 실패", error);
    });
}
