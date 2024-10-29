class MyUtility {
  static getRandomInRange(min, max) {
    return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  //한 자리 수일 때 앞에 01,02 식으로 0 붙여주는 함수
  static plusZero(number) {
    if (number < 10) {
      return "0" + String(number);
    } else return String(number);
  }
  //배열 안에서 아무거나 하나 집어주는 함수. 사용할 때 배열.length가 아니라 배열 자체를 인자로 넣어줘야함.
  static getRandByLen(array) {
    return Math.floor(Math.random() * array.length);
  }
}

module.exports = MyUtility;
