const userDetail = document.getElementById("user-detail");

const userId = window.location.pathname.split("/").pop();
async function fetchuserDetail() {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  rederUserDetail(data.user);
  renderOrders(data.revenue);
}
function rederUserDetail(data) {
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
function renderOrders(data) {
  const tableHeader = document.getElementById("order-header");
  const tableBody = document.getElementById("order-body");
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
      if (key === "orderId") {
        td.innerHTML = `<a href="/user_detail/${id}?rev_month=${value}">${value}</a>`;
      } else if (key === "purchasedDate") {
        td.textContent = Number(value).toLocaleString() + "원";
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}
fetchStoreDetail();
