const imgs = document.getElementsByClassName("imgbox");
const mainImg = document.getElementById("mainImg");

const addImg = (img) => {
  img.addEventListener("click", (e) => {
    console.log(e.target.src);
    mainImg.src = e.target.src;
  });
};
for (item of imgs) {
  addImg(item);
}
