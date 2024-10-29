class TypeGenerator {
  constructor() {
    this.type = ["스타벅스", "이디야", "커피빈", "투썸"];
  }
  getType() {
    return this.type[util.getRandByLen(this.type)];
  }
}
//대충 1호점~10호점 중에 아무거나 나오도록
class storeNameGennerator {
  constructor() {
    this.space = ["홍대", "송파", "잠실", "강서", "신촌"];
    this.number = 10;
  }
  getStoreName() {
    return (
      this.space[util.getRandByLen(this.space)] +
      " " +
      util.getRandomInRange(1, this.number) +
      "호점"
    );
  }
}
class StoreGenerator {
  constructor() {
    this.idGen = require("./IdGen");
    this.types = new TypeGenerator();
    this.names = new storeNameGennerator();
    this.addressGen = require("./AddressGen");
  }

  generateStoreData(count) {
    const addrGen = new this.addressGen();
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.idGen.getUuid();
      const type = this.types.getType();
      const name = this.names.getStoreName();
      const address = addrGen.generateAddress();
      //푸시할 때 []배열 안에 id,type,name을 넣는 것에 주의
      data.push([id, type, name, address]);
    }
    return data;
  }
}
