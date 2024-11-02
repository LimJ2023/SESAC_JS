class AddressGenerator {
  constructor() {
    this.cities = ["서울", "인천", "부산", "대구", "광주"];
    this.dong = ["강남구", "부평구", "강서구", "남구", "중구"];
  }
  generateAddress() {
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

module.exports = AddressGenerator;
