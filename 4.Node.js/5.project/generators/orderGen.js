const util = require("./util");
const IdGen = require("./IdGen");
const CSVliibrary = require("./CSV");
class OrderGenerator {
  constructor() {
    this.id = new IdGen();
    this.csv = new CSVliibrary();
    this.ordered_at = new RandDateGenerator();
    this.store_ids = [];
    this.user_ids = [];
  }

  async generateOrderData(filePath, count) {
    const data = [];

    //비동기 선언 후 await으로 write가 데이터를 읽을 때까지 기다리게 했음
    const storeData = await this.csv.csvParse(filePath + "store.csv");
    const userData = await this.csv.csvParse(filePath + "user.csv");

    //store.Id <-- id인지 Id인지 csv에 설정된 헤드를 잘 봐야함...이걸로 고생
    this.store_ids = storeData.map((store) => store.Id);
    this.user_ids = userData.map((user) => user.Id);

    for (let i = 0; i < count; i++) {
      const id = this.id.getUuid();
      const ordered_at = this.ordered_at.getRandDate();
      const store_id = this.store_ids[util.getRandByLen(this.store_ids)];
      const user_id = this.user_ids[util.getRandByLen(this.user_ids)];
      data.push([id, ordered_at, store_id, user_id]);
    }
    return data;
  }
}
class RandDateGenerator {
  getRandDate() {
    const month = util.plusZero(util.getRandomInRange(1, 12));
    const day = util.plusZero(util.getRandomInRange(1, 30));
    const hour = util.plusZero(util.getRandomInRange(1, 24));
    const minute = util.plusZero(util.getRandomInRange(1, 60));
    const second = util.plusZero(util.getRandomInRange(1, 60));

    return `2024-${month}-${day} ${hour}:${minute}:${second}`;
  }
}

module.exports = OrderGenerator;
