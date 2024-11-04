class DataPrinter {
  constructor(data) {
    this.data = data;
  }
  printUserData() {
    //이거 for문 돌리는 문법이 재밌음 <--순서 틀리면 이상하게 나옴
    const header = this.data.slice(0, 1);
    // console.log("프린터에서 추출한 헤더 ", header);
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
module.exports = DataPrinter;
