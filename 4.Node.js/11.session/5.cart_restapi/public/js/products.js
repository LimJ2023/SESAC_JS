document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
});

function loadProduct() {
  fetch("/api/products")
    .then((responce) => {
      return responce.json();
    })
    .then((products) => {
      console.log(products, "가져온 목록");
      displayProducts(products);
    });
}

function displayProducts(products) {
  const productTableBody = document.querySelector("#productTable tbody");

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><button class="add-to-cart-btn" data-product-id="${product.id}"> 담기 </button></td>
    `;
    productTableBody.appendChild(row);
  });

  document.querySelectorAll("add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      addToCart(productId);
    });
  });
}
function addToCart(id) {
  fetch("cart", {
    method: "POST",
  });
}
