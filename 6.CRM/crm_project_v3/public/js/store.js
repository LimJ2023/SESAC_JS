async function fetchStore(page) {
  try {
    const response = await fetch(`/api/stores/${page}`);
    const data = await response.json();
    renderTable(data.data);
    paging(data.totalArr, data.page);
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
    const th = document.createElement("th");
    th.textContent = f;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);
  // 바디 그리기 tr 안에 td 그리기
  data.map((e) => {
    const bodyRow = document.createElement("tr");
    for (const [key, value] of Object.entries(e)) {
      const td = document.createElement("td");
      if (key === "Id") {
        td.innerHTML = `<a href="/store/${value}">${value}</a>`;
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}

// 페이징 처리
function paging(totalArr, curPage) {
  const ul = document.getElementById("page-ul");
  ul.innerHTML = "";

  totalArr.forEach((page) => {
    const li = document.createElement("li");
    li.classList.add("page-item"); // Bootstrap 페이지 항목 클래스

    // 페이지 링크
    li.innerHTML = `
                  <a href="/stores/${page}" class="page-link">${page}</a>
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
const page = window.location.pathname.split("/").pop() || 1;

document.getElementById("darkmodebtn").addEventListener("click", (e) => {
  const mode = e.target.textContent;
  e.target.innerText = mode === "다크 모드로" ? "라이트 모드로" : "다크 모드로";
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const switchTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", switchTheme);
});
console.log(page);
fetchStore(page);
