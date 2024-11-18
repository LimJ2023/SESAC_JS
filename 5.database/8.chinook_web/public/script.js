document.addEventListener("DOMContentLoaded", () => {
  search();
  pageButtons();
});

function search() {
  document
    .getElementById("searchButton")
    .addEventListener("click", async () => {
      const page = 1;
      const query = document.getElementById("search").value;
      const type = document.getElementById("type").value;

      try {
        const response = await fetch(
          `/api/search?searchQuery=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();
        createList(data.results);
        paging(1, Number(data.total));
      } catch (error) {
        console.log(error.message);
      }

      // try {
      //   fetchingData(query, type, page);
      // } catch (error) {
      //   console.log("검색 도중 오류 발생");
      // }
    });
}
async function fetchingData(query, type, page) {
  const response = await fetch(
    `/api/search?searchQuery=${query}&searchScope=${type}&page=${page}`
  );
  const data = await response.json();
  localStorage.setItem("page", data.total);
  createList(data.results);
  paging(data.pages);
}

function createList(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.map((item) => {
    const li = document.createElement("li");
    if (item.Title) {
      li.innerText = item.Title;
      list.appendChild(li);
    } else if (item.FullName) {
      li.innerText = item.FullName;
      list.appendChild(li);
    } else if (item.Composer) {
      li.innerText = item.Composer;
      list.appendChild(li);
    } else {
      li.innerText = item.Name;
      list.appendChild(li);
    }
  });
}

function pageButtons() {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  prev.addEventListener("click", async () => {
    const page = Number(localStorage.getItem("page"));
    const query = document.getElementById("search").value;
    const type = document.getElementById("type").value;
    const response = await fetch(
      `/api/search?searchQuery=${query}&searchScope=${type}&page=${page - 1}`
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
      `/api/search?searchQuery=${query}&searchScope=${type}&page=${page + 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
  });
}

function paging(page, total) {
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
