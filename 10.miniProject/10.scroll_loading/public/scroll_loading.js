const container = document.getElementById("scroll-container");
let start = 0;
const itemPerLoad = 20;
let end = start + itemPerLoad;
let prev = 0;
let count = 0;
let loading = false;
const maxItemCount = itemPerLoad * 5;

fetchScrollDown();

window.addEventListener("scroll", () => {
  console.log(
    `스크롤위치 : ${window.innerHeight}, ${window.scrollY}, ${document.body.offsetHeight}`
  );
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("화면 끝에 있음");
    fetchScrollDown();
  }
  if (window.scrollY <= 0) {
    console.log("화면 맨 위로 스크롤됨");
    console.log(start, prev);
    fetchScrollUp();
  }
});

function fetchScrollDown() {
  fetch(`/api/data?start=${start}&end=${end}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.textContent = item;
        container.appendChild(itemElement);

        if (container.children.length > maxItemCount) {
          container.removeChild(container.firstChild);
        }
      });
    });
  count++;
  prev = start - maxItemCount;
  start = count * itemPerLoad;
  end = start + itemPerLoad;
}
function fetchScrollUp() {
  fetch(`/api/data?start=${prev}&end=${start}`)
    .then((response) => response.json())
    .then((data) => {
      data.reverse().forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.textContent = item;
        container.insertBefore(itemElement, container.firstChild);

        if (container.children.length > maxItemCount) {
          container.removeChild(container.lastChild);
        }
      });
      let prevScrollY = 60 * itemPerLoad;
      window.scrollTo(0, prevScrollY);
    });
  count--;
  prev = start - maxItemCount;
  start = count * itemPerLoad;
  end = start + itemPerLoad;
}
