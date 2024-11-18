function pageButtons() {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  prev.addEventListener("click", async () => {
    const page = Number(localStorage.getItem("page"));
    const query = document.getElementById("search").value;
    const type = document.getElementById("type").value;
    const response = await fetch(
      `/search?searchQuery=${query}&searchScope=${type}&page=${page - 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
  });
  next.addEventListener("click", async () => {
    const page = Number(localStorage.getItem("page"));
    const query = document.getElementById("search").value;
    const type = document.getElementById("type").value;
    const response = await fetch(
      `/search?searchQuery=${query}&searchScope=${type}&page=${page + 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
  });
}

function paging({ page, total }) {
  const pages = document.getElementById("pages");
  pages.innerText = `${page} / ${total}`;

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  console.log("받아온 페이지 : ", page);
  if (page === 1) {
    prev.setAttribute("disabled", "");
    next.removeAttribute("disabled");
  } else if (page === total) {
    next.setAttribute("disabled", "");
    prev.removeAttribute("disabled");
  } else {
    next.removeAttribute("disabled");
    prev.removeAttribute("disabled");
  }
}
