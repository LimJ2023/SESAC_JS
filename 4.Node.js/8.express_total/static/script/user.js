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
        window.alert("등록 성공!");
      } else {
        //서버에선 ok사인이 떨어지지 않음.
        // 그러나 그 이유를 메세지로 받아오려고 하면 response.json()을 거쳐야하기에
        // 프론트 쪽에서 즉시 Error를 쓰로우 했음. 에러 이유는 뭔지 아니까 여기서도 쓸 수 있음.
        throw new Error("해당 아이디는 이미 존재합니다.");
      }
      userId.value = "";
      return response.json();
    })
    .then((data) => {
      displayUser(data);
    })
    .catch((error) => {
      console.log("catch 진입 : ", error.message);
      alert(error.message);
    });
}

function displayUser(data) {
  //객체 분해
  const { id: userId, name: userName } = data;
  const table = document.getElementById("userTable");
  let div = document.createElement("div");
  div.id = userId;
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
      deleteUser(userId);
    }
    return;
  });
  editButton.addEventListener("click", () => {
    editUser(userId);
  });
  table.appendChild(div);
  div.appendChild(editButton);
  div.appendChild(delButton);
}
function updateUsers() {
  fetch("/user")
    .then((responce) => responce.json())
    .then((users) => {
      const userTable = document.getElementById("userTable");
    })
    .catch((error) => {
      console.log("사용자 불러오는데 실패", error);
      alert("사용자 로딩 오류");
    });
}
function editUser(userId) {
  const inputName = window.prompt("이름을 입력해주세요.");
  if (!inputName) {
    alert("수정할 아이디를 입력해주세요.");
    return;
  }
  // fetch("/user", {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     id: userId,
  //     inputName: inputName,
  //   }),
  // })
  fetch(`/user/${userId}?input=${inputName}`, {
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
      const div = document.getElementById(id);
      div.innerHTML = `<span>Id: </span><p>${id}</p><span>Name: </span><p>${name}</p>`;
      const editButton = document.createElement("button");
      const delButton = document.createElement("button");
      editButton.textContent = "수정";
      delButton.textContent = "삭제";
      delButton.addEventListener("click", () => {
        let isDelete = window.confirm("정말 삭제하시겠습니까?");
        if (isDelete) {
          deleteUser(id);
        }
        return;
      });
      editButton.addEventListener("click", () => {
        editUser(id);
      });
      div.appendChild(editButton);
      div.appendChild(delButton);
    });
  return;
}
function deleteUser(userId) {
  fetch(`/user/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const div = document.getElementById(data.id);
      div.remove();
    })
    .catch((error) => {
      alert("삭제 실패");
      console.log("삭제 실패", error);
    });
}
