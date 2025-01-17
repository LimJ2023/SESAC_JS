const sendButton = document.getElementById("sendButton");
const chatContainer = document.getElementById("chatContainer");
async function sendMessage() {
  try {
    const questionInput = document.getElementById("questionInput");
    const question = questionInput.value.trim();
    const response = await fetch("/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    console.log(data);
    if (data.answer) {
      addMessage(data.answer);
    }
  } catch (error) {
    console.log("에러발생", error.message);
  }
}
sendButton.addEventListener("click", sendMessage);
questionInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
async function addMessage(answer) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `
            <div class="content">${answer}</div>
            `;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

