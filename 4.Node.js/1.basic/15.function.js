function sum_to_n(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  console.log(sum);
  return sum;
}

function sum_to_n2(n) {
  let sum = 0;
  sum = (n * (n + 1)) / 2;
  console.log(sum);
  return sum;
}

// sum_to_n(100);
sum_to_n2(103);
