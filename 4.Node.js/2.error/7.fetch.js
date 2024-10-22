try {
  let response = fetch("https://api.example.com/data");

  if (!response.ok) {
    throw new Error("http 오류 : ", response.status);
  }
} catch (error) {
  console.log("요청 오류...");
}
