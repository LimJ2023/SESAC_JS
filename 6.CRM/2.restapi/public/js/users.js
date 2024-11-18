const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-name");
  fetchUser(searchInput);
});

async function fetchUsers() {
  try {
    const response = await fetch(`/api/users`);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchUser(searchName) {
  try {
    const response = await fetch(`/api/users/${searchName}`);
    const data = await response.json();
    console.log("가져온 유저 정보 : ", data);
    renderTable(data);
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
  console.log(fields);
  fields.forEach((f) => {
    if (f !== "Id" && f !== "Address") {
      const th = document.createElement("th");
      th.textContent = f;
      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);
  // 바디 그리기 tr 안에 td 그리기
  data.map((e) => {
    const bodyRow = document.createElement("tr");
    bodyRow.addEventListener("click", () => {
      window.location.href = `/users/${e.Id}`;
    });
    for (const [key, value] of Object.entries(e)) {
      if (key !== "Id" && key !== "Address") {
        const td = document.createElement("td");
        td.textContent = value;
        bodyRow.appendChild(td);
      }
    }
    tableBody.appendChild(bodyRow);
  });
}

fetchUsers();
