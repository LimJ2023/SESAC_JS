const userDetail = document.getElementById("user-detail");

const userId = window.location.pathname.split("/").pop();
async function fetchItemDetail() {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  rederItemDetail(data.user);
  renderRevenue(data.orders);
  renderVisitRanking(data.visitRanking);
  renderPurchaseRanking(data.purchaseRanking);
  const labels = data.purchaseRanking.map((e) => e.Name);
  const charData = data.purchaseRanking.map((e) => e.purchaseCount);
  drawChart(labels, charData);
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
function renderVisitRanking(data) {
  const ul = document.getElementById("visitList");
  data.map((v) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${v.name} (${v.visitCount}번 방문)`;
    ul.appendChild(li);
  });
}
function renderPurchaseRanking(data) {
  const ul = document.getElementById("purchaseList");
  data.map((v) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${v.Name} (${v.purchaseCount}번 주문)`;
    ul.appendChild(li);
  });
}

function drawChart(labels, data) {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: "주문한 상품 갯수",
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
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
