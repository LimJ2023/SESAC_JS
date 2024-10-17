const imgs = document.getElementsByClassName("imgbox");
const container = document.getElementById("imgcontainer");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const addImg = (img) => {
  img.addEventListener("click", (e) => {});
};
for (item of imgs) {
  addImg(item);
}

//왜 한 번은 움직이는데 두 번은 안움직일까?
let currentX = 0;
const move = 1200;
prev.addEventListener("click", () => {
  currentX += move;
  if (currentX >= 0) {
    prev.style.display = "none";
  } else next.style.display = "block";
  console.log("왼쪽으로 ", currentX);
  container.style.transform = `translateX(${currentX}px)`;
});
next.addEventListener("click", () => {
  currentX -= move;
  if (currentX <= -3600) {
    next.style.display = "none";
  } else {
    prev.style.display = "block";
  }
  console.log("오른쪽으로 ", currentX);
  container.style.transform = `translateX(${currentX}px)`;
});
