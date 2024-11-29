const userDetail = document.getElementById("user-detail");

const orderId = window.location.pathname.split("/").pop();
async function fetchItemDetail() {
  const response = await fetch(`/api/order/${orderId}`);
  const data = await response.json();
  renderOrderDetail(data.orderItem);
}
function renderOrderDetail(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";
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
      if (key === "orderId") {
        td.innerHTML = `<a href="/order/${value}">${value}</a>`;
      } else if (key === "itemId") {
        td.innerHTML = `<a href="/item/${value}">${value}</a>`;
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
fetchItemDetail();
