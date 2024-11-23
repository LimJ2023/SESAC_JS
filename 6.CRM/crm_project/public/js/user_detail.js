const userDetail = document.getElementById("user-detail");

const userId = window.location.pathname.split("/").pop();
async function fetchItemDetail() {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  rederItemDetail(data.user);
  renderRevenue(data.orders);
  renderVisitRanking(data.visitRanking);
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
  console.log("userFields : ", userFields);
  const bodyRow = document.createElement("tr");
  userFields.map((e) => {
    if (e !== userFields[0]) {
      const td = document.createElement("td");
      td.textContent = e;
      bodyRow.appendChild(td);
    }
  });
  tableBody.appendChild(bodyRow);
}
function renderRevenue(data) {
  const tableHeader = document.getElementById("order-header");
  const tableBody = document.getElementById("order-body");
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
      if (key === "orderId") {
        td.innerHTML = `<a href="/order_detail/${value}">${value}</a>`;
      } else if (key === "itemId") {
        td.innerHTML = `<a href="/item_detail/${value}">${value}</a>`;
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}
function renderVisitRanking(data) {
  const ul = document.getElementById("visitList");
  data.map((v) => {
    const li = document.createElement("li");
    li.textContent = `${v.name} (${v.visitCount}번 방문)`;
    ul.appendChild(li);
  });
}
fetchItemDetail();
