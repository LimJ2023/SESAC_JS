// const readline = require("readline"); //올드한 방법.
// import readline from "readline";

import readline from "linebyline";

var rl = readline("./example.txt");
rl.on("line", function (line, lineCount, byteCount) {
  // do something with the line of text
  console.log(
    line + "라인 카운트 : ",
    lineCount,
    "바이트 카운트 : ",
    byteCount
  );
}).on("error", function (e) {
  // something went wrong
  console.log("뭔가 오류 발생", e.message);
});
