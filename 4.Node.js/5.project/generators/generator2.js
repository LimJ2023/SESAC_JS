const UserGenerator = require("./UserGen");
const StoreGen = require("./StoreGen");
const ItemGenerator = require("./ItemGen");
const OrderGenerator = require("./orderGen");
const CSVliibrary = require("./CSV");
const OrderItemGenerator = require("./OrderItemGen");

function GenerateData() {
  const userGen = new UserGenerator();
  const storeGen = new StoreGen();
  const itemGen = new ItemGenerator();
  const orderGen = new OrderGenerator();
  const csv = new CSVliibrary();
  const orderItemGen = new OrderItemGenerator();
  const orderItemHead = ["Id", "OrderId", "ItemId"];
  const itemHead = ["Id", "Name", "Type", "UnitPrice"];
  const orderHead = ["Id", "OrdereAt", "StoreId", "UserId"];
  const usersHead = ["Id", "Name", "Gender", "Age", "Birthdate", "Address"];
  const storeHead = ["Id", "Type", "Name", "Address"];

  const filePath = "./csv3/";

  async function csvWrite(filePath) {
    const users = userGen.generateUserData(1000);
    const stores = storeGen.generateStoreData(100);
    const items = itemGen.generateItemData(20);
    csv.csvWrite(filePath + "item.csv", items, itemHead);
    csv.csvWrite(filePath + "store.csv", stores, storeHead);
    csv.csvWrite(filePath + "user.csv", users, usersHead);
    const orders = await orderGen.generateOrderData(filePath, 10000);
    csv.csvWrite(filePath + "order.csv", orders, orderHead);
    const orderItems = await orderItemGen.generateOrderItem(filePath, 50000);
    csv.csvWrite(filePath + "orderitem.csv", orderItems, orderItemHead);
  }
  csvWrite(filePath);
}

//생성기를 클래스의 상속을 받는걸로 하면 어떨까?
//그럴려면 첨부터 다시 만들어야할듯...
//통합하기부터 함
GenerateData();
