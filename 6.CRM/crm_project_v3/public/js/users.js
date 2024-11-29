const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-name").value;
  const gender = document.getElementById("gender").value;
  fetchUser(searchInput, gender);
});
async function fetchUser(searchName, gender) {
  try {
    const response = await fetch(
      `/api/users/?name=${searchName}&gender=${gender}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          name: searchName,
          gender,
        }),
      }
    );
    const data = await response.json();
    console.log("가져온 유저 정보 : ", data);
    renderTable(data.data);
    paging(data.totalArr, data.page, data.name, data.gender);
  } catch (error) {
    console.log(error.message);
  }
}
async function fetchUsers(page) {
  try {
    const params = new window.URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const gender = params.get("gender") || "";
    const response = await fetch(
      `/api/users/${page}?name=${name}&gender=${gender}`
    );
    const data = await response.json();
    renderTable(data.data);
    paging(data.totalArr, data.page, data.name, data.gender);
  } catch (error) {
    console.log(error.message);
  }
}
function renderTable(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  // 초기화
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  // 헤더 그리기
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data[0]);
  fields.forEach((f) => {
    if (f !== "Address") {
      const th = document.createElement("th");
      th.textContent = f;
      th.classList.add("text-center"); // Bootstrap 중앙 정렬
      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);

  // 바디 그리기
  data.forEach((e) => {
    const bodyRow = document.createElement("tr");

    for (const [key, value] of Object.entries(e)) {
      if (key !== "Address") {
        const td = document.createElement("td");
        if (key === "Id") {
          td.innerHTML = `<a href="/user/${value}" class="text-decoration-none">${value}</a>`; // 링크 스타일
        } else {
          td.textContent = value;
        }
        td.classList.add("text-center"); // Bootstrap 중앙 정렬
        bodyRow.appendChild(td);
      }
    }

    // 행 클래스 추가
    bodyRow.classList.add("align-middle"); // Bootstrap 행 정렬
    tableBody.appendChild(bodyRow);
  });
}

function paging(totalArr, curPage, name, gender) {
  const ul = document.getElementById("page-ul");
  ul.innerHTML = "";

  totalArr.forEach((page) => {
    const li = document.createElement("li");
    li.classList.add("page-item"); // Bootstrap 페이지 항목 클래스

    // 페이지 링크
    li.innerHTML = `
      <a href="/users/${page}?name=${name}&gender=${gender}" class="page-link">${page}</a>
    `;

    // 현재 페이지 강조
    if (curPage === page) {
      li.classList.add("active");
    }

    // 비활성 페이지 처리
    if (page === "...") {
      li.classList.add("disabled");
      const link = li.querySelector("a");
      link.removeAttribute("href");
      link.style.pointerEvents = "none";
    }

    ul.appendChild(li);
  });
}

document.getElementById("darkmodebtn").addEventListener("click", (e) => {
  const mode = e.target.textContent;
  e.target.innerText = mode === "다크 모드로" ? "라이트 모드로" : "다크 모드로";
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const switchTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", switchTheme);
});

const page = window.location.pathname.split("/").pop() || 1;
fetchUsers(page);
