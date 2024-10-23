const fs = require("fs");
const path = require("path");
const directoryPath = "./"; //현재 디렉토리

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("디렉토리 읽기 오류");
  } else {
    files.forEach((file) => {
      // 비동기 처리 함수인데, 동기 처리함수로 바꿔보기

      // 파일 패스 path를 만들어서 file과 join시킨다.
      const filePath = path.join(directoryPath, file);
      try {
        // 그 후 파일 패스를 statSync에 전달. .isFile()에 접근 가능했음.
        // 그런거 안해도 됐네 그냥 file넣으면 끝이었네 ㅋㅋ
        const isfile = fs.statSync(file).isFile();
        console.log(`이 파일 ${file}은 파일타입입니까? ${isfile}`);
      } catch (error) {
        console.log("파일 참거짓 판단 중 오류 ", error.message);
      }

      //   fs.stat(file, (err, stats) => {
      //     if (err) console.log("스텟 읽기 도중 오류");
      //     else {
      //       //파일인지 아닌지 알려줌
      //       console.log(stats.isDirectory());
      //       console.log(stats.isFile());
      //     }
      //   });
    });
  }
});
