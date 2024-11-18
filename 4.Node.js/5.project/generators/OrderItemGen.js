const idGen = require("./IdGen");
const CSVliibrary = require("./CSV");
const util = require("./util");
class OrderItemGenerator {
  constructor() {
    this.idGen = new idGen();
    this.csv = new CSVliibrary();
    this.item = [];
    this.orderId = "";
  }

  async generateOrderItem(filePath, count) {
    const data = [];

    const orders = await this.csv.csvParse(filePath + "orders.csv");
    const items = await this.csv.csvParse(filePath + "items.csv");

    const order_ids = orders.map((order) => order.Id);
    const item_ids = items.map((item) => item.Id);

    for (let i = 0; i < count; i++) {
      const id = this.idGen.getUuid();
      const order_id = order_ids[util.getRandByLen(order_ids)];
      const item_id = item_ids[util.getRandByLen(item_ids)];

      data.push([id, order_id, item_id]);
    }
    return data;
  }
}
module.exports = OrderItemGenerator;
