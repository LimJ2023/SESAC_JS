const CSVliibrary = require("./CSV");
const util = require("./util");
class NameGenerator {
  constructor() {
    this.names = [
      "임요한",
      "김민준",
      "박서준",
      "최도윤",
      "김지호",
      "이서윤",
      "김채원",
      "이지유",
      "조수아",
      "이지아",
      "강준영",
      "장승현",
      "장은지",
      "조하은",
      "윤예진",
    ];
  }
  generateName() {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }
}

class GenderGenerator {
  generateGender() {
    return Math.random() < 0.5 ? "남성" : "여성";
  }
}

class BirthdateGenerator {
  generateBirthdate() {
    //yyyy-mm-dd 포맷으로 반환
    //1960 - 2010

    const year = util.getRandomInRange(1960, 2010);
    // const month = Math.floor(Math.random() * 12);
    // const month = util.plusZero(Math.floor(Math.random() * 12) + 1);
    const month = util.plusZero(util.getRandomInRange(1, 12));
    const day = util.plusZero(util.getRandomInRange(1, 30));
    // return new Date(year, month, day);
    //01,02 등은 어떻게 만들어놓을까?

    return `${year}-${month}-${day}`;
  }
}
class AddressGenerator {
  constructor() {
    this.cities = ["서울", "인천", "부산", "대구", "광주"];
    this.dong = ["강남구", "부평구", "강서구", "남구", "중구"];
  }
  generateAddress() {
    //1~100까지 번지수를 붙인 주소 생성
    const randBunji = Math.floor(Math.random() * 100 + 1);
    return (
      this.cities[Math.floor(Math.random() * this.cities.length)] +
      " " +
      this.dong[Math.floor(Math.random() * this.dong.length)] +
      " " +
      Math.floor(Math.random() * 100 + 1) +
      "로 " +
      Math.floor(Math.random() * 100 + 1)
    );
  }
}
class IdGenerator {
  constructor() {
    this.uuidv4 = require("uuid");
  }
  getUuid() {
    return this.uuidv4.v4();
  }
}
class AgeGenerator {
  getAge(birthday) {
    const year = birthday.slice(0, 4);
    return 2024 - year;
  }
}
class TypeGenerator {
  constructor() {
    this.type = ["스타벅스", "이디야", "커피빈", "투썸"];
  }
  getType() {
    return this.type[util.getRandByLen(this.type)];
  }
}
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
    this.id = new IdGenerator();
    this.type = new TypeGenerator();
    this.name = new storeNameGennerator();
    this.address = new AddressGenerator();
  }

  generateStoreData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.id.getUuid();
      const type = this.type.getType();
      const name = this.name.getStoreName();
      const address = this.address.generateAddress();
      data.push([id, type, name, address]);
    }
    return data;
  }
}
class UserGenerator {
  constructor() {
    this.id = new IdGenerator();
    this.nameGen = new NameGenerator();
    this.ageGen = new AgeGenerator();
    this.birthGen = new BirthdateGenerator();
    this.genderGen = new GenderGenerator();
    this.address = new AddressGenerator();
  }

  generateUserData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.id.getUuid();
      const name = this.nameGen.generateName();
      const gender = this.genderGen.generateGender();
      const birthday = this.birthGen.generateBirthdate();
      const age = this.ageGen.getAge(birthday);
      const address = this.address.generateAddress();
      data.push([id, name, gender, age, birthday, address]);
    }
    return data;
  }
}

class DataPrinter {
  constructor(data) {
    this.data = data;
  }
  printUserData() {
    //이거 for문 돌리는 문법이 재밌음
    for (const [id, name, gen, age, bir] of this.data) {
      console.log(
        `id: ${id} 이름: ${name}, 성별: ${gen}, 나이: ${age} 생년월일: ${bir}`
      );
    }
  }
  printStoreData() {
    for (const [id, type, name, address] of this.data) {
      console.log(`id:${id}, 타입: ${type}, 점포명: ${name}, 주소: ${address}`);
    }
  }
  printarray() {
    console.log(this.data);
  }
  printOrderData() {
    for (let item of this.data) {
      console.log(item);
    }
  }
}
class RandDateGenerator {
  getRandDate() {
    const month = util.plusZero(util.getRandomInRange(1, 12));
    const day = util.plusZero(util.getRandomInRange(1, 30));
    const hour = util.plusZero(util.getRandomInRange(1, 24));
    const minute = util.plusZero(util.getRandomInRange(1, 60));
    const second = util.plusZero(util.getRandomInRange(1, 60));

    return `2023-${month}-${day} ${hour}:${minute}:${second}`;
  }
}
class OrderGenerator {
  constructor() {
    this.id = new IdGenerator();
    this.csv = new CSVliibrary();
    this.ordered_at = new RandDateGenerator();
    this.store_ids = [];
    this.user_ids = [];
  }

  async generateOrderData(filePath, count) {
    const data = [];

    //비동기 선언 후 await으로 write가 데이터를 읽을 때까지 기다리게 했음
    const storeData = await csv.csvParse(filePath + "store.csv");
    const userData = await csv.csvParse(filePath + "user.csv");

    //store.Id <-- id인지 Id인지 헤드를 잘 봐야함..이걸로 고생
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
//오더 id와 생성된 아이템을 기반으로 <- 아이템도 id값만 가져오면 되나?
class OrderItemGenerator {
  constructor() {
    this.id = new IdGenerator();
    this.csv = new CSVliibrary();
    this.item = [];
    this.orderId = "";
  }

  async generateOrderItem(filePath, count) {
    const data = [];

    const orders = await csv.csvParse(filePath + "order.csv");
    const items = await csv.csvParse(filePath + "item.csv");

    const order_ids = orders.map((order) => order.Id);
    const item_ids = items.map((item) => item.Id);

    for (let i = 0; i < count; i++) {
      const id = this.id.getUuid();
      const order_id = order_ids[util.getRandByLen(order_ids)];
      // const order_id = order_ids[Math.floor(Math.random() * order_ids)];
      const item_id = item_ids[util.getRandByLen(item_ids)];

      data.push([id, order_id, item_id]);
    }
    return data;
  }
}

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
    this.id = new IdGenerator();
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
      //배열 안에 들어가게 하는 것에 주의. 그냥 집어넣지 말고
      data.push([id, name, type, price]);
    }
    console.log(data);
    return data;
  }
}

//========================여기서부터 사용=================================================

//헤드부분을 어딘가에 합치던가 해야할듯(아마 제네레이터 부분에)
const orderItemHead = ["Id", "OrderId", "ItemId"];
const itemHead = ["Id", "Name", "Type", "UnitPrice"];
const orderHead = ["Id", "OrdereAt", "StoreId", "UserId"];
const usersHead = ["Id", "Name", "Gender", "Age", "Birthdate", "Address"];
const storeHead = ["Id", "Type", "Name", "Address"];
//초기화
const userGenerator = new UserGenerator();
const storeGenerator = new StoreGenerator();
const orderGenerator = new OrderGenerator();
const itemGenerator = new ItemGenerator();
const orderItemGenerator = new OrderItemGenerator();

//함수 호출(몇 개인지 카운트)
const users = userGenerator.generateUserData(1000);
const stores = storeGenerator.generateStoreData(100);
const items = itemGenerator.generateItemData(20);

// const dataPrinter = new DataPrinter(stores);
// dataPrinter.printOrderData();

// ===================쓰기 부분. ========================================================

//저장,불러올 파일 경로.(절대경로 해도 됨)
const filePath = "./csv/";
const csv = new CSVliibrary();

//오더는 다른 데이터를 읽어오고 쓰니까 비동기 함수로 구현
async function orders(filePath) {
  const orders = await orderGenerator.generateOrderData(filePath, 10000);
  csv.csvWrite(filePath + "order.csv", orders, orderHead);
}

async function orderItems(filePath) {
  const orderItems = await orderItemGenerator.generateOrderItem(
    filePath,
    50000
  );
  csv.csvWrite(filePath + "orderitem.csv", orderItems, orderItemHead);
}
orderItems(filePath);
// orders(filePath);
// csv.csvWrite(filePath + "item.csv", items, itemHead);
// csv.csvWrite(filePath + "store.csv", stores, storeHead);
// csv.csvWrite(filePath + "user.csv", users, usersHead);
