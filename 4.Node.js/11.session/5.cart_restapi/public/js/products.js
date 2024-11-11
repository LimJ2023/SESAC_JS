document.addEventListener("DOMContentLoaded", (e) => {
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
    })
    .catch((err) => {
      console.log(err.message);
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
    <td><button class="add-to-cart-btn" data-product-id="${product.id}">담기</button></td>
    `;
    productTableBody.appendChild(row);
  });
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    console.log("카트 몇개");
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      addToCart(productId);
    });
  });
}
function addToCart(productId) {
  fetch(`/api/cart/${productId}`, {
    method: "POST",
  }).then((responce) => {
    if (responce.ok) {
      //장바구니 담기 성공
      console.log("장바구니 성공");
    } else if (responce.status === 401) {
      responce.json().then((data) => {
        alert(data.message);
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      });
    } else {
      throw new Error("장바구니 담기 실패");
    }
  });
}
