function blockDiv() {
  const div = document.getElementById("hiddendiv");
  const display = window.getComputedStyle(div).display;
  console.log(display);
  if (display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}
