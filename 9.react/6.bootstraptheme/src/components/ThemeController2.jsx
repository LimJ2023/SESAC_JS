
function ThemeController2({mode, setMode}) {

  
  function handleSwitch(e) {

      if (mode === "dark") {
          const table = document.getElementById("table");
          table.classList.add("table-white");
          table.classList.remove("table-dark");
          document.querySelectorAll(".bg-dark").forEach((item) => {
              item.classList.toggle("bg-light");
              item.classList.remove("bg-dark");
          })
          document.querySelectorAll(".color-dark").forEach((item) => {
              item.classList.toggle("color-light");
          })
          document.querySelectorAll(".text-dark").forEach((item) => {
              item.classList.toggle("text-white");
          })
          document.querySelectorAll(".page-link").forEach((item) => {
              item.classList.add("color-dark")
              item.classList.remove("color-light")
              item.classList.add("text-dark")
              item.classList.remove("text-white")
          })
          const nav = document.getElementById("nav")
          nav.classList.add("navbar-white");
          nav.classList.remove("navbar-dark");
          e.target.classList.add("text-dark");
          e.target.classList.remove("text-white");
          setMode("white")
      } else {
          const table = document.getElementById("table");
          table.classList.add("table-dark");
          table.classList.remove("table-light");

          document.querySelectorAll(".bg-light").forEach((item) => {
              item.classList.add("bg-dark");
              item.classList.remove("bg-light");
          })
          document.querySelectorAll(".page-link").forEach((item) => {
              item.classList.add("color-light")
              item.classList.remove("color-dark")
              item.classList.add("text-light")
              item.classList.remove("text-dark")
          })

          const nav = document.getElementById("nav")
          nav.classList.add("navbar-dark");
          nav.classList.remove("navbar-white");

          e.target.classList.add("text-white");
          e.target.classList.remove("text-dark");
          setMode("dark");
      };
  }
  return (
    <button className="btn bg-light" id="switch" onClick={handleSwitch}>Switch mode</button>
  )
}

export default ThemeController2;