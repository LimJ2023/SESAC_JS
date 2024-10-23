const fs = require("fs");
const path = require("path");
const directoryPath = "../3.class";

fs.readdir(directoryPath, "utf-8", (err, files) => {
    if (err) return console.log("읽기 실패", err);
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return console.log(err);
            console.log(data);
        });
    });
    console.log(files);
});
