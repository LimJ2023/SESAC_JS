const rlSync = require("readline-sync");

//윈도우 터미널에서 한글 깨지는문제 <- 인코딩이슈. chcp 65001

const answer1 = rlSync.question("첫번째 숫자 입력 : ");
console.log("첫번째 숫자는 : ", answer1);

const answer2 = rlSync.question("두번째 숫자 입력 : ");
console.log("첫번째 숫자는 : ", answer2);
