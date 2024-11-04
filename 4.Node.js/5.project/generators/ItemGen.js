const util = require("./util");
const IdGen = require("./IdGen");
//어떻게 이름과 타입을 매칭시킬까?
//타입이 먼저고 이름이 나중에 오게 할까?
class ItemTypeAndNameGenerator {
  constructor() {
    this.type = ["Coffe", "Cake", "Juice"];
    this.coffes = ["Americano Coffe", "Espresso Coffe"];
    this.cakes = ["Strawberry Cake", "Vanilla Cake", "Red Velvet Cake"];
    this.juices = ["Watermelon Juice", "Lemon Juice"];
  }
  generateItemName() {
    const typeandname = {};
    const types = this.type[util.getRandByLen(this.type)];
    switch (types) {
      case "Coffe":
        typeandname.type = "Coffe";
        typeandname.name = this.coffes[util.getRandByLen(this.coffes)];
        break;
      case "Cake":
        typeandname.type = "Cake";
        typeandname.name = this.cakes[util.getRandByLen(this.cakes)];
        break;
      case "Juice":
        typeandname.type = "Juice";
        typeandname.name = this.juices[util.getRandByLen(this.juices)];
        break;
      default:
        console.log("잘못된 메뉴 선택됨 ");
        break;
    }
    return typeandname;
  }
}
class itemPrice {
  constructor() {
    this.price = 0;
  }
  getUnitPrice(base, unit) {
    return Math.floor(Math.random() * 9 + 1) * unit + base;
  }
}
class ItemGenerator {
  constructor() {
    this.id = new IdGen();
    this.typeandname = new ItemTypeAndNameGenerator();
    this.unitPrice = new itemPrice();
    this.name = [];
    this.Type = [];
  }

  generateItemData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.id.getUuid();
      const typeandname = this.typeandname.generateItemName();
      const name = typeandname.name;
      const type = typeandname.type;
      //최소 2000원. 500원 단위로 랜덤.
      const price = this.unitPrice.getUnitPrice(2000, 500);
      data.push([id, name, type, price]);
    }
    return data;
  }
}

module.exports = ItemGenerator;
