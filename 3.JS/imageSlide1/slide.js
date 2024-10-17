const imgs = ["g1.jpg", "g2.jpg", "g3.jpg", "g4.jpg"];
const guitar = document.getElementById("guitar");
let currnetImg = 0;
document.getElementById("prev").addEventListener("click", () => {
  if (currnetImg == 0) {
    currnetImg = 4;
  }
  currnetImg--;
  guitar.src = imgs[currnetImg];
});

document.getElementById("next").addEventListener("click", () => {
  if (currnetImg == 3) {
    currnetImg = -1;
  }
  currnetImg++;
  guitar.src = imgs[currnetImg];
});
