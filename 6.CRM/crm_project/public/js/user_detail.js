const userDetail = document.getElementById("user-detail");

const userId = window.location.pathname.split("/").pop();
async function fetchUserDetail() {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  console.log(data);
  rederUserDetail(JSON.stringify(data));
}
function rederUserDetail(user) {
  const row = document.createElement("p");
  row.textContent = user;

  userDetail.appendChild(row);
}

fetchUserDetail();
