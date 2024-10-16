const open = document.getElementById("open");
const modal = document.querySelector(".modal");
const close = document.getElementById("close");
const container = document.querySelector(".modalcontainer");

open.onclick = () => {
  // modal.style.display = 'block';
  container.style.display = "flex";
};
close.onclick = () => {
  // modal.style.display = 'none';
  container.style.display = "none";
};
