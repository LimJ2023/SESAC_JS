import checkLoginFetch from "./checkuser.js";

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

// function logincheck() {
//   if (checkLoginFetch()) {
//   }
// }
function loadCart() {
  fetch("/api/cart")
    .then((responce) => {
      if (responce.ok) {
        // 성공
        return responce.json();
      } else if (responce.status === 401) {
        // 로그인 필요
        responce.json().then((data) => {
          alert(data.message);
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          }
        });
      } else {
        // 실패
      }
    })
    .then((cart) => {
      displayCart(cart);
    });
}

function displayCart(cartdata) {
  const cart = cartdata.cart;
  const cartTableBody = document.querySelector("#cartTable tbody");

  cart.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td class="cart-quantity" data-cart-id="${item.id}"><span >${item.quantity}</span><button class="plusBtn">+</button><button class="minusBtn">-</button></td>
    <td><button>삭제</button></td>`;

    cartTableBody.appendChild(row);
  });

  document.querySelectorAll(".cart-quantity").forEach((item) => {
    
  });
}

function updateQuantity(productId, change) {
  fetch(`/api/cart/${productId}?change=${change}`, {
    method: "POST",
  })
    .then((responce) => responce.json())
    .then((data) => {
      //성공
    });
}

function removeFromCart(productId) {
  fetch(`/api/cart/${productId}`, {
    method: "DELETE",
  })
    .then((responce) => responce.json())
    .then((data) => {
      // 삭제 성공
    });
}
