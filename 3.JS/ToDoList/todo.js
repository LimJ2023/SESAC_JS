const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const addBtn = document.getElementById("addButton");
addBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  const del = document.createElement("button");
  del.setAttribute("class", "delButton");
  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.addEventListener("change", (e) => {
    //ㅋㅋㅋㅋchecked 속성이 당연히 있을줄 알앗지
    // mdn에 진짜 있음. https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/checkbox
    console.log(e.target.checked);
    if (e.target.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });
  del.textContent = "삭제하기";
  del.addEventListener("click", () => {
    list.removeChild(li);
  });

  //만들 때 텍스트 안에 i를 더 만들어버렸으니 <i><i></i></i>이런식으로 되어있었지...이걸몰랏네
  li.append(check);
  li.append(input.value);
  li.appendChild(del);
  list.appendChild(li);
  input.value = "";
});
