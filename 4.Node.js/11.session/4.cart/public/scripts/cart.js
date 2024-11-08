const { all } = require("superagent/lib/request-base");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/products");
  const products = await response.json();
  displayProducts(products);
});

function displayProducts(products) {
  //tbody에 상품 목록 출력
  const prodctTable = document.getElementById("productsTable");
  const cartTable = document.getElementById("cartTable");
  products.map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button id="${item.id}">추가하기</button></td>`;
    prodctTable.appendChild(tr);
    document.getElementById(item.id).addEventListener("click", () => {
      handleCart(cartTable, item);
    });
  });
}
async function handleCart(table, item) {
  const responce = await fetch(`/cart?id=${item.id}`);
  const products = await responce.json();
  table.products.map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>`;
    table.appendChild(tr);
  });
}
