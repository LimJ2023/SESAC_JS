document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const progressBar = document.getElementById("progressBar");
  const timeInput = document.getElementById("duration");
  const percent = document.getElementById("per");
  let interval; //타이머 인터벌
  let duration;
  let timepassd = 0;

  function startProgress() {
    percent.style.display = "block";
    duration = Number(document.getElementById("duration").value);

    interval = setInterval(() => {
      timepassd++;
      let progress = (timepassd / duration) * 100;
      progressBar.style.width = progress + "%";
      percent.textContent = `${Math.floor(progress)}%`;
      if (timepassd >= duration) {
        clearInterval(interval);
      }
    }, 1000);
  }

  function resetProgress() {
    progressBar.style.width = 0;
    timepassd = 0;
    duration = 0;
    percent.textContent = "";
    percent.style.display = "none";
  }
  startButton.addEventListener("click", startProgress);
  resetButton.addEventListener("click", resetProgress);
});
