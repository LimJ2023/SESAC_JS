function sum_to_100() {
  //1부터 100까지의 합산을 반납한다.
  let sum = 0;
  for (let i = 1; i <= 100; i++) {
    sum += i;
  }
  return sum;
  //while문으로도
  //   let i=1;
  //   while(i <= 100) {
  //     sum += i;
  //   }
  //   return sum;
}
function sum3_to_100(n) {
  let sum = 0;
  //수를 반으로 나눠. 그리고 곱하기 길이의 반으로 곱해
  //등차수열 법칙
  sum = (n * (n - 1)) / 2;
  return sum;
}

//이런 식으로 시간 측정...
console.time("for");
console.log(sum_to_100());
console.timeEnd("for");
// 함수명은 덮어씌울 수 있다.. <- 좋지 않아
