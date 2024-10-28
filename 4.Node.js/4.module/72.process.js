//'C:\\Program Files\\nodejs\\node.exe', 이건 첫번째인자
//'C:\\SESAC\\SESAC_JS\\4.Node.js\\4.module\\72.process.js', 얜 두번째 인자.

const args = process.argv.slice(2); //필요없는 인자 2개 버리고시작하는것.
console.log(args);

if (args.length == 0) {
  console.log("입력 인자가 없습니다.");
} else {
  console.log("명령어 인수: ");
  args.forEach((arg, index) => {
    console.log(`인수${index + 1} 은 ${arg} 입니다.`);
  });
}
