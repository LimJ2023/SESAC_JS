const CSVliibrary = require("./CSV");

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

class MyUtility {
  static getRandomInRange(min, max) {
    return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  static plusZero(number) {
    if (number < 10) {
      return "0" + String(number);
    } else return String(number);
  }
}
class BirthdateGenerator {
  generateBirthdate() {
    //yyyy-mm-dd 포맷으로 반환
    //1960 - 2010
    const year = MyUtility.getRandomInRange(1960, 2010);
    // const month = Math.floor(Math.random() * 12);
    // const month = MyUtility.plusZero(Math.floor(Math.random() * 12) + 1);
    const month = MyUtility.plusZero(MyUtility.getRandomInRange(1, 12));
    const day = MyUtility.plusZero(MyUtility.getRandomInRange(1, 30));
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
    return this.type[Math.floor(Math.random() * this.type.length)];
  }
}
class storeNameGennerator {
  constructor() {
    this.space = ["홍대", "송파", "잠실", "강서", "신촌"];
    this.number = 10;
  }
  getStoreName() {
    return (
      this.space[Math.floor(Math.random() * this.space.length)] +
      " " +
      MyUtility.getRandomInRange(1, this.number) +
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
    const month = MyUtility.plusZero(MyUtility.getRandomInRange(1, 12));
    const day = MyUtility.plusZero(MyUtility.getRandomInRange(1, 30));
    const hour = MyUtility.plusZero(MyUtility.getRandomInRange(1, 24));
    const minute = MyUtility.plusZero(MyUtility.getRandomInRange(1, 60));
    const second = MyUtility.plusZero(MyUtility.getRandomInRange(1, 60));

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

  async getOrderData(filePath, count) {
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
      data.push([
        id,
        ordered_at,
        this.store_ids[Math.floor(Math.random() * this.store_ids.length)],
        this.user_ids[Math.floor(Math.random() * this.user_ids.length)],
      ]);
    }
    return data;
  }
}
class ItemGenerator {
  constructor() {
    this.id = IdGenerator();
    this.name = [];
    this.Type = [];
    this.unitPrice = 0;
  }
}

const itemHead = ["Id", "Name", "Type", "UnitPrice"];
const orderHead = ["Id", "OrdereAt", "StoreId", "UserId"];
const usersHead = ["Id", "Name", "Gender", "Age", "Birthdate", "Address"];
const storeHead = ["Id", "Type", "Name", "Address"];
const userGenerator = new UserGenerator();
const storeGenerator = new StoreGenerator();
const orderGenerator = new OrderGenerator();
const users = userGenerator.generateUserData(1000);
const stores = storeGenerator.generateStoreData(100);

const filePath = "./csv/";
const csv = new CSVliibrary();

// async function orderDatas() {
//   const orders = await orderGenerator.getOrderData();
//   console.log(orders);
// }
// orderDatas();
// const orderGenerator = new OrderGenerator();
// const orders = orderGenerator.getOrderData(
//   stores[Math.random() * stores.length],
//   users[Math.random() * users.length]
// );
// const dataPrinter = new DataPrinter(stores);
// dataPrinter.printOrderData();

async function orders(filePath) {
  const orders = await orderGenerator.getOrderData(filePath, 10000);
  csv.csvWrite(filePath + "order.csv", orders, orderHead);
}
orders(filePath);

// csv.csvWrite(filePath + "store.csv", stores, storeHead);
// csv.csvWrite(filePath + "user.csv", users, usersHead);
