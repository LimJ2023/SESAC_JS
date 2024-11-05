document.addEventListener("DOMContentLoaded", () => {
  const userTable = document.getElementById("userTable");
  const form = document.getElementById("form");
  //form 버튼 누를 시 post.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("username");
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
          return response.json();
        } else {
          console.log("submit 에러");
        }
      })
      .then((data) => {
        const userId = data.id;
        const userName = data.name;
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
          const isDelete = window.confirm("정말 삭제하시겠습니까?");

          if (isDelete) {
            fetch("/user", {
              method: "DELETE",
              body: data.id,
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log("삭제할 클래스: ", data.id);
                document.getElementsByClassName(data.id)[0].remove();
              });
          }
        });
        editButton.addEventListener("click", () => {
          const inputName = window.prompt("이름을 입력해주세요.");
          const userId = data.id;
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
            });
        });
        table.appendChild(div);
        div.appendChild(editButton);
        div.appendChild(delButton);
        console.log("submit 성공", data);
      });
  });
  //시작할 때 자동로딩
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
});
