const userDetail = document.getElementById("user-detail");

const itemId = window.location.pathname.split("/").pop();
async function fetchItemDetail() {
  const response = await fetch(`/api/item/${itemId}`);
  const data = await response.json();
  rederItemDetail(data.item);
  renderRevenue(data.revenue);
  const labels = data.revenue.map((e) => e.month);
  const chartData = data.revenue.map((e) => e.revenue);
  const counts = data.revenue.map((e) => e.count);
  console.log("쿼리 실행 결과 : ", labels, chartData, counts);
  drawBar({ labels, chartData, counts });
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

function drawBar(data) {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  const labels = data.labels;
  const revenueData = data.chartData;
  const counts = data.counts;

  const revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "Revenue",
          data: revenueData,
          backgroundColor: "rgba(54, 162, 235, 0.8)",
          yAxisID: "yRevenue",
        },
        {
          type: "line",
          label: "Total Count",
          data: counts,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          yAxisID: "yCounts",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Revenue and Count",
        },
      },
      scales: {
        x: {
          stacked: false,
        },
        y: {
          yRevenue: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Revenue",
            },
          },
          yCounts: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Total Count",
            },
            grid: {
              drawOnChartArea: false, // 오른쪽 y축만 별도로 표시
            },
          },
        },
      },
    },
  });
}

fetchItemDetail();
