const storeDetail = document.getElementById("store-detail");

const storeId = window.location.pathname.split("/").pop();
async function fetchStoreDetail() {
  const params = new window.URLSearchParams(window.location.search);
  const month = params.get("rev_month") || "";
  const response = await fetch(`/api/store/${storeId}?rev_month=${month}`);
  const data = await response.json();
  rederStoreDetail(data.store);
  renderRevenue(data.revenue);
  renderFrequency(data.frequency);
}
function rederStoreDetail(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data);
  fields.forEach((f) => {
    if (f !== "Id") {
      const th = document.createElement("th");
      th.textContent = f;
      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);
  // 바디 그리기 tr 안에 td 그리기
  const storeFields = Object.values(data);
  console.log("storeFields : ", storeFields);
  const bodyRow = document.createElement("tr");
  storeFields.map((e) => {
    if (e !== storeFields[0]) {
      const td = document.createElement("td");
      td.textContent = e;
      bodyRow.appendChild(td);
    }
  });
  tableBody.appendChild(bodyRow);
}
function renderRevenue(data) {
  const tableHeader = document.getElementById("revenue-header");
  const tableBody = document.getElementById("revenue-body");
  const id = window.location.pathname.split("/").pop();
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
      if (key === "month") {
        td.innerHTML = `<a href="/store/${id}?rev_month=${value}">${value}</a>`;
      } else if (key === "revenue") {
        td.textContent = Number(value).toLocaleString() + "원";
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}

// 단골 손님 구하기 (매장별 손님 방문 횟수)
function renderFrequency(data) {
  const tableHeader = document.getElementById("frequency-header");
  const tableBody = document.getElementById("frequency-body");
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
      if (key === "userId") {
        td.innerHTML = `<a href="/user/${value}>${value}</a>`;
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}
document.getElementById("darkmodebtn").addEventListener("click", (e) => {
  const mode = e.target.textContent;
  e.target.innerText = mode === "다크 모드로" ? "라이트 모드로" : "다크 모드로";
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const switchTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", switchTheme);
});
fetchStoreDetail();
