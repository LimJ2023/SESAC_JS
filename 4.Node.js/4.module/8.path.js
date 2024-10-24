const path = require("path");

//OS에 따라 달라질수도 있어서 그냥 url을 집어넣지 않고 path를 사용한다...
// join으로 여러개의 경로를 합칠수도 있다. kita/hi/hello.txt....
const filePath = path.join("C:/SESAC/SESAC_JS/images", "kita.jpg");
console.log("파일 경로 : ", filePath);

//확장자 가져오기.
const extName = path.extname(filePath);
console.log("파일의 확장자 : ", extName);

const dirName = path.dirname(filePath);
console.log("디렉토리명 : ", dirName);

const fileName = path.basename(filePath);
console.log("파일명 : ", fileName);
