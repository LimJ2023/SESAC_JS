const userDetail = document.getElementById("user-detail");

const itemId = window.location.pathname.split("/").pop();
async function fetchItemDetail() {
  const response = await fetch(`/api/item/${itemId}`);
  const data = await response.json();
  console.log(data.item);
  rederItemDetail(data.item);
  renderRevenue(data.revenue);
}
function rederItemDetail(data) {
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
  const userFields = Object.values(data);
  const bodyRow = document.createElement("tr");
  userFields.map((e) => {
    const td = document.createElement("td");
    td.textContent = e;
    bodyRow.appendChild(td);
  });
  tableBody.appendChild(bodyRow);
}

function renderRevenue(data) {
  const tableHeader = document.getElementById("revenue-header");
  const tableBody = document.getElementById("revenue-body");
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
      if (key === "revenue") {
        td.textContent = Number(value).toLocaleString() + "원";
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}
fetchItemDetail();
