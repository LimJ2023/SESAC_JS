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
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";
  //헤더 그리기 tr 안에 th 그리기
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data[0]);
  fields.forEach((f) => {
    if (f !== "Address") {
      const th = document.createElement("th");
      th.textContent = f;
      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);
  // 바디 그리기 tr 안에 td 그리기
  data.map((e) => {
    const bodyRow = document.createElement("tr");
    bodyRow.addEventListener("click", () => {
      window.location.href = `/user/${e.Id}`;
    });
    for (const [key, value] of Object.entries(e)) {
      if (key !== "Address") {
        const td = document.createElement("td");
        td.textContent = value;
        bodyRow.appendChild(td);
      }
    }
    tableBody.appendChild(bodyRow);
  });
}

function paging(totalArr, curPage, name, gender) {
  const ul = document.getElementById("page-ul");
  ul.innerHTML = "";
  totalArr.forEach((page) => {
    const li = document.createElement("li");
    li.classList.add("page-li");
    li.innerHTML = `
                <a href="/users/${page}?name=${name}&gender=${gender}">${page}</a>
            `;

    ul.appendChild(li);

    if (curPage === page) {
      li.classList.add("active");
    }
    if (page === "...") {
      li.classList.add("disabled");
      const link = li.querySelector("a");
      link.removeAttribute("href");
      link.style.pointerEvents = "none";
    }
  });
}

const page = window.location.pathname.split("/").pop() || 1;
fetchUsers(page);
