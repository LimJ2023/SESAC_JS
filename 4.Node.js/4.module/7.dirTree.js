const fs = require("fs");
const directoryPath = "Z:/github/SESAC_JS/4.Node.js";
const path = require("path");

//디렉토리를 발견하면 또 readline을 호출하므로 재귀적인 함수라고 생각했다.
// 1. 내 생각과 다른 순서로 디렉토리가 출력됨. (1,2,3,4폴더 -> 1.1,1.2...순으로)
// 비동기 처리이기 때문에 fs 함수들에 모두 sync를 붙이면 동기적으로 처리할거라고 생각.  <- 해결
// 2. 디렉토리는 구현했는데 폴더 안의 폴더 안의 파일을 구현할 경우 공백이 계속 커져야 함...
// 공백을 변수로 넘겨줘서 계속 더하도록..
/// 3. 공백을 넘겨주는것까진 좋은데 1,2,3,4번 폴더가 같은 위치에 출력되질 않음. 아마 공백을 추가한게 그대로 전달되어서 그런듯
// 함수마다 깊이를 가지게 하고 그만큼 스페이스를 주는 방식으로 변경. 디렉토리일 때마다 deep + 1을 계속 주어서 공백을 늘림.
function readlines(directoryPath, deep) {
    const files = fs.readdirSync(directoryPath, "utf-8");
    const space = "  ".repeat(deep);
    files.forEach((file) => {
        //여기서 한번 더 readdir을 하면?
        const filePath = path.join(directoryPath, file);
        const isfile = fs.statSync(filePath).isFile();
        if (isfile) {
            // const filePath = path.join(directoryPath, file);
            console.log(`*  ${space}\\__${file}`);
        } else {
            //한번 더 들어감
            console.log(`+-+ ${space}*${file}`);
            readlines(filePath, deep + 1);
        }
    });
}
//폴더구조를 위한 깊이
const deep = 0;
readlines(directoryPath, deep);

// fs.readdir(directoryPath, "utf-8", (err, files) => {
//     if (err) return console.log("읽기 실패", err);
//     console.log(files);
//     files.forEach((file) => {
//         //여기서 한번 더 readdir을 하면?
//         const filePath = path.join(directoryPath, file);
//         const isfile = fs.statSync(filePath).isFile();
//         const isDirectory = fs.statSync(filePath).isDirectory();
//         if (isfile) {
//             const filePath = path.join(directoryPath, file);
//             console.log(filePath);
//         } else if (isDirectory) {
//             //한번 더 들어감
//         }
//     });
// });
