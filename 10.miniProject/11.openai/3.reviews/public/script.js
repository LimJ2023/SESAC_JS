let reviews = [];

async function submitReview() {
  const rating = document.querySelector("input[name='rating']:checked").value;
  const comment = document.getElementById("comment").value;

  try {
    const response = await fetch("/api/review", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, comment }),
    });
    const message = await response.json();
    console.log(message);
    await getReviews();
    await fetchAISummary();
  } catch (error) {}
}

async function getReviews() {
  try {
    const response = await fetch("/api/reviews");
    const data = await response.json();
    console.log(data);
    displayReviews(data.reviews);
  } catch (error) {
    console.error("리뷰 가져오는 중 오류 발생", error.message);
  }
}
async function fetchAISummary() {
  try {
    const response = await fetch("/api/ai-summary");
    const data = await response.json();
    console.log(data);
    displayAISummary(data);
  } catch (error) {
    console.error("리뷰 가져오는 중 오류 발생", error.message);
  }
}
function displayAISummary(data) {
  const summaryContainer = document.getElementById("summary-container");
  summaryContainer.innerHTML = `
  <p><strong>요약 : </strong> ${data.summary}</p><p><strong>평균별점 : </strong> <p>${data.averageRating}</p>
  
  `;
}
function displayReviews(reviews) {
  const reviewsContainer = document.getElementById("reviews-container");

  reviewsContainer
    .querySelectorAll(".review-box")
    .forEach((box) => box.remove());

  reviews.forEach((review) => {
    const reviewBox = document.createElement("div");
    reviewBox.className = "review-box";
    reviewBox.innerHTML = `
      <p>Rating: ${review.rating}</p>
      <p>${review.comment}</p>
    `;

    reviewsContainer.appendChild(reviewBox);
  });
}
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

window.onload = async () => {
  await getReviews();
};
