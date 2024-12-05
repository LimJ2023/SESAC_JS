async function fetchPosts() {
  const response = await fetch("http://localhost:3001/api/posts");
  const data = await response.json();
  console.log(data);
  const posts = data;
  const tbody = document.getElementById("tbody");

  for (const post of posts) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.content}</td>
          <td>${
            post.image
              ? `<img src="http://localhost:3001/uploads/${post.image}" alt="이미지" style="width: 100px;">`
              : "없음"
          }</td>
          <td>${post.postedAt}</td>
          <td><button onclick="deletePost(${post.id})">삭제</button></td>
      `;
    tbody.appendChild(tr);
  }
}
fetchPosts();

document.getElementById("postBtn").addEventListener("click", () => {
  window.location.href = "./post.html";
});

async function deletePost(id) {
  const response = await fetch(`http://localhost:3001/post/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    alert("삭제 완료");
    window.location.reload();
  } else {
    alert("삭제 실패");
  }
}
