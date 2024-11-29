async function fetchOrder(page) {
  try {
    const response = await fetch(`/api/orderItem/${page}`);
    const data = await response.json();
    console.log("orderItem 데이터 : ", data);
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
      if (key === "OrderId") {
        td.innerHTML = `<a href="/order/${value}">${value}</a>`;
      } else if (key === "ItemId") {
        td.innerHTML = `<a href="/item/${value}">${value}</a>`;
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}

function paging(totalArr, curPage) {
  const ul = document.getElementById("page-ul");
  ul.innerHTML = "";
  totalArr.forEach((page) => {
    const li = document.createElement("li");
    li.classList.add("page-li");
    li.innerHTML = `
                        <a href="/orderItem/${page}">${page}</a>
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
fetchOrder(page);
