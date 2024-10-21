let j = 0;

// while (j < 5) {
//   console.log(j);
//   j++;
// }

// break : for,while 어디든지 해당 블록을 탈출한다.

//구구단 출력하기

for (let i = 2; i <= 9; i++) {
  console.log(`\n=== ${i}단 ===`);
  for (let j = 1; j <= 9; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
}
