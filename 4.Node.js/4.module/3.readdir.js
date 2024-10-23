const fs = require("fs");

const directoryPath = "../3.class";

fs.readdir(directoryPath, "utf-8", (err, files) => {
  if (err) return console.log(err);
  files.forEach((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return console.log(err);
      console.log(data);
    });
  });
});
