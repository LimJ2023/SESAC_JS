const os = require("os");

const hostname = os.hostname();

console.log("내 pc의 호스트명은 : ", hostname);

const tmpDir = os.tmpdir();
console.log(tmpDir);

const freemem = os.freemem();

console.log("잔여 메모리는 ", freemem);

console.log("cpu는? ", os.cpus());
