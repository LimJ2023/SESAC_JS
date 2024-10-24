function asyncLooongtask(callback) {
  setTimeout(() => {
    const ran = Math.random();
    if (ran > 0.5) {
      callback(null, "작업이 완료되었습니다.");
      console.log("2초 뒤 실행됩니다.");
    } else {
      callback("작업이 실패했습니다.", null);
    }
  }, 2000);
}

asyncLooongtask((err, result) => {
  if (err) {
    console.log("실패 : ", err);
    return;
  }
  console.log("성공 : ", result);
});

function displayResult() {
  console.log("콜백 실행 완료");
}
asyncLooongtask(displayResult);
