document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/products", {
    method: "GET",
  });
  const products = await response.json();
  displayProducts(products);

  const responceCart = await fetch("/cart", {
    method: "GET",
  });
  const cart = await responceCart.json();
  displayCart();
});

function displayProducts(products) {
  //tbody에 상품 목록 출력
  const prodctTable = document.getElementById("productsTable");
  const cartTable = document.getElementById("cartTable");
  products.map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.id}</td>
                <td><img src="${item.url}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button id="${item.id}">추가하기</button></td>`;
    prodctTable.appendChild(tr);
    document.getElementById(item.id).addEventListener("click", async () => {
      await handleCart(cartTable, item);
    });
  });
}
function displayCart(cart, total) {
  const products = cart.products;
  const total = data.total;

  products.map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.id}</td>
                <td><img src="${item.url}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" id="${item.id}quantity" min="1"></td>
                <td><button id="${item.id}delete">삭제</button></td>`;

    table.appendChild(tr);
    const changeQuantity = document.getElementById(`${item.id}quantity`);
    //input 박스의 변화를 감지하는건 addEventListener("input"
    changeQuantity.addEventListener("input", async () => {
      await handleQuantity(item.id, changeQuantity.value);
    });

    document
      .getElementById(`${item.id}delete`)
      .addEventListener("click", async () => {
        await handleDelete(item.id);
      });
  });
  document.getElementById("total").innerText = total;
}
async function handleCart(table, item) {
  table.innerHTML = "";
  try {
    const responce = await fetch(`/cart?id=${item.id}`, {
      method: "POST",
    });

    const data = await responce.json();
    const products = data.products;
    const total = data.total;

    products.map((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${item.id}</td>
                <td><img src="${item.url}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" id="${item.id}quantity" min="1"></td>
                <td><button id="${item.id}delete">삭제</button></td>`;

      table.appendChild(tr);
      const changeQuantity = document.getElementById(`${item.id}quantity`);
      //input 박스의 변화를 감지하는건 addEventListener("input"
      changeQuantity.addEventListener("input", async () => {
        await handleQuantity(item.id, changeQuantity.value);
      });

      document
        .getElementById(`${item.id}delete`)
        .addEventListener("click", async () => {
          await handleDelete(item.id);
        });
    });
    document.getElementById("total").innerText = total;
  } catch (error) {
    console.log("상품을 추가하는 중 오류 발생");
  }
}

async function handleQuantity(id, count) {
  try {
    const responce = await fetch("/quantity", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        count,
      }),
    });
    const data = await responce.json();

    document.getElementById("total").innerText = data.total;
  } catch (error) {
    console.log("수량 변경 중 오류");
  }
}

async function handleDelete(id) {
  const table = document.getElementById("cartTable");
  table.innerHTML = "";
  try {
    const responce = await fetch(`/delete?id=${id}`, {
      method: "DELETE",
    });
    const data = await responce.json();
    const products = data.products;
    const total = data.total;
    console.log("받아온 products,", products);
    //목록이 전부 비었을 때.
    if (products.length === 0) {
      document.getElementById("total").innerText = total;
      return;
    }
    products.map((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${item.id}</td>
                <td><img src="${item.url}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" id="${item.id}quantity" min="1" max="10"></td>
                <td><button id="${item.id}delete">삭제</button></td>`;

      table.appendChild(tr);
      const changeQuantity = document.getElementById(`${item.id}quantity`);
      //input 박스의 변화를 감지하는건 addEventListener("input"
      changeQuantity.addEventListener("input", async () => {
        await handleQuantity(item.id, changeQuantity.value);
      });

      document
        .getElementById(`${item.id}delete`)
        .addEventListener("click", async () => {
          await handleDelete(item.id);
        });
      document.getElementById("total").innerText = total;
    });
  } catch (error) {
    console.log("삭제 중 오류", error.message);
  }
}
