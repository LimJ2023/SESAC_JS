const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const addBtn = document.getElementById("addButton");
const delAllBtn = document.getElementById("delAllButton");

addBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  const del = document.createElement("button");
  del.setAttribute("class", "delButton");
  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.addEventListener("change", (e) => {
    //ㅋㅋㅋㅋchecked 속성이 당연히 있을줄 알앗지
    // mdn에 진짜 있음. https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/checkbox
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
  // li.appendChild(check);
  // li.appendChild(input.value);
  // li.appendChild(del);
  //append를 이용해서 한번에 넣는게 가능한가?
  li.append(check, input.value, del);
  list.appendChild(li);
  input.value = "";
});

delAllBtn.addEventListener("click", () => {
  const lis = document.getElementsByTagName("li");
  console.log(lis);
  //왜 하나가 남냐...이유가 뭐지
  // for (item of lis) {
  //   item.remove();
  // }
  //HTMLCollection을 반환하는데 실시간 동기화되는 컬렉션이기 때문이다.
  // 요소를 삭제할때마다 길이가 동적으로 줄어드는데, for문의 인덱스는 넘어갔기 때문에
  // 두번째 요소만 삭제하게 되는 문제가 발생하는 것...
  // 해결하기 위해 역순 for문을 작성한다.
  for (let i = lis.length - 1; i >= 0; i--) {
    lis[i].remove();
  }
});
