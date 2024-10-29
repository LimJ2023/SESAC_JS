//uuid 생성 이건 쉽고
class IdGenerator {
  constructor() {
    this.uuidv4 = require("uuid");
  }
  static getUuid() {
    return this.uuidv4.v4();
  }
}

module.exports = IdGenerator;
