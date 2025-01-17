const chatContainer = document.getElementById("chatContainer");

function readText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lnag = "ko-KR";
  speechSynthesis.speak(utterance);
}

async function convertCurrency() {
  const amount = document.getElementById("amountInput").value;
  const from = document.getElementById("currencyFromSelect").value;
  const to = document.getElementById("currencyToSelect").value;

  try {
    const response = await fetch("/api/chat-currency", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, from, to }),
    });
    const data = await response.json();
    console.log(data);
    if (data.message) {
      addMessage(data.message);
      readText(data.message);
    }
  } catch (error) {
    console.log("에러발생", error.message);
  }
}

async function addMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `
              <div class="content">${message}</div>
              `;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
