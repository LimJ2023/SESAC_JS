const util = require("./util");
//어떻게 이름과 타입을 매칭시킬까?
//타입이 먼저고 이름이 나중에 오게 할까?
class ItemTypeAndNameGenerator {
  constructor() {
    //타입별로 배열을 분리함
    this.type = ["Coffe", "Cake", "Juice"];
    this.coffes = ["Americano Coffe", "Espresso Coffe"];
    this.cakes = ["Strawberry Cake", "Vanilla Cake", "Red Velvet Cake"];
    this.juices = ["Watermelon Juice", "Lemon Juice"];
  }
  generateItemName() {
    //타입을 정한뒤 나온 타입에 따라 제품명이 다르게 나오도록..
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
  // 500원 단위로 가격조절됨, 최소가격 2000원?
  getUnitPrice(base, unit) {
    return Math.floor(Math.random() * 9 + 1) * unit + base;
  }
}
class ItemGenerator {
  constructor() {
    this.id = require("./IdGen");
    this.typeandname = new ItemTypeAndNameGenerator();
    this.unitPrice = new itemPrice();
    this.name = [];
    this.Type = [];
  }

  generateItemData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.id.getUuid();
      //더 좋은 구조는 없을까? 타입이랑 이름을 같이 불러오는게 정말 맞나?
      const typeandname = this.typeandname.generateItemName();
      const name = typeandname.name;
      const type = typeandname.type;
      const price = this.unitPrice.getUnitPrice(2000, 500);
      //[] 배열 안에 들어가게 하는 것에 주의. 그냥 집어넣지 말고
      data.push([id, name, type, price]);
    }
    console.log(data);
    return data;
  }
}
