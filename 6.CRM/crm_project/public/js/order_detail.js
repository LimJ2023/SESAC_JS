const userDetail = document.getElementById("user-detail");

const orderId = window.location.pathname.split("/").pop();
async function fetchItemDetail() {
  const response = await fetch(`/api/order_detail/${orderId}`);
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

fetchItemDetail();
