function asyncOperation1(result, callback) {
  setTimeout(() => {
    console.log("Operation completed");
    callback();
  }, 1000);
}
function asyncOperation2(responce, callback) {
  setTimeout(() => {
    console.log("Operation completed", responce);
    callback(responce);
  }, 1000);
}
const result = "첫번째 작업";
asyncOperation1(result, (responce1) => {
  asyncOperation2(responce1, (responce2) => {
    asyncOperation1(responce2, (responce3) => {
      asyncOperation2(responce3, (responce4) => {
        console.log("Final result : ", responce4);
      });
    });
  });
});
