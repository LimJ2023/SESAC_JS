const fs = require("fs");
const path = require("path");
const directoryPath = "./";

function checkfile(filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log("정보 조회 실패");
      return;
    }
    if (stats.isFile()) {
      console.log("이것은 파일입니다.");
    } else if (stats.isDirectory()) {
      console.log("이것은 디렉토리입니다");
    } else {
      console.log("모르겟습니다.");
    }
  });
}

function filecheck2(filePath) {
  try {
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      console.log("이것은 파일입니다.");
    } else if (stats.isDirectory()) {
      console.log("이것은 디렉토리입니다");
    } else {
      console.log("모르겟습니다.");
    }
  } catch (error) {
    console.log("에러입니다.");
  }
}
// fs.readdir(directoryPath, (err, files) => {
//   //읽기가 끝났을 때 호출할 내용.
//   if (err) return console.log("파일을 읽는 도중 오류 발생");

//   //   console.log(files);

//   files.forEach((file) => {
//     const filePath = path.join(directoryPath, file);
//     console.log("파일 : ", filePath);
//     filecheck2(filePath);
//   });
// });

function readdirSyncF() {
  try {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      console.log("파일 : ", filePath);
      filecheck2(filePath);
    });
  } catch (error) {
    console.log("파일을 읽는 도중 오류 발생");
  }
}
readdirSyncF();
