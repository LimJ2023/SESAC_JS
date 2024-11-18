const UserGenerator = require("./UserGen");
const StoreGen = require("./StoreGen");
const ItemGenerator = require("./ItemGen");
const OrderGenerator = require("./orderGen");
const CSVliibrary = require("./CSV");
const OrderItemGenerator = require("./OrderItemGen");
const DataPrinter = require("./Printer");

function GenerateData() {
  // 이걸 하나하나 다 불러오는게 맞나? 한 함수로 퉁칠수있나?
  // 상속을 받게 시켜서 Generator타입으로 다 불러오고 그 안에 인자만 바꿔주는 방식...
  const userGen = new UserGenerator();
  const storeGen = new StoreGen();
  const itemGen = new ItemGenerator();
  const orderGen = new OrderGenerator();
  const csv = new CSVliibrary();
  const orderItemGen = new OrderItemGenerator();

  const orderItemHead = ["Id", "OrderId", "ItemId"];
  const itemHead = ["Id", "Name", "Type", "UnitPrice"];
  const orderHead = ["Id", "OrdersAt", "StoreId", "UserId"];
  const usersHead = ["Id", "Name", "Gender", "Age", "Birthdate", "Address"];
  const storeHead = ["Id", "Type", "Name", "Address"];

  const filePath = "./csv2/";

  async function csvWrite(filePath) {
    const users = userGen.generateUserData(1000);
    const stores = storeGen.generateStoreData(100);
    const items = itemGen.generateItemData(20);
    //왜 얘네는 await을 붙이지 않아도 문제가 없지? 쓰기는 다음작업을 무조건 기다리게 되는건가?
    csv.csvWrite(filePath + "stores.csv", stores, storeHead);
    csv.csvWrite(filePath + "users.csv", users, usersHead);
    csv.csvWrite(filePath + "items.csv", items, itemHead);
    //읽어와야 하기 때문에 비동기 처리
    const orders = await orderGen.generateOrderData(filePath, 10000);
    csv.csvWrite(filePath + "orders.csv", orders, orderHead);
    const orderItems = await orderItemGen.generateOrderItem(filePath, 50000);
    csv.csvWrite(filePath + "orderitem.csv", orderItems, orderItemHead);
  }
  csvWrite(filePath);
}

//헤더를 제너레이터들 안에 포함시키기 리팩토링필요
//생성기를 클래스의 상속을 받는걸로 하면 어떨까?
//그럴려면 첨부터 다시 만들어야할듯...
//우선 통합하기부터 함
GenerateData();
