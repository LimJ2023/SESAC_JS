const util = require("./util");
const IdGen = require("./IdGen");
class NameGenerator {
  constructor() {
    this.lastname = ["김", "이", "박", "최", "정"];
    this.firstname = [
      "가온",
      "나미",
      "다솜",
      "종라",
      "마영",
      "운바",
      "요한",
      "사이",
      "이즈",
      "럭스",
      "가렌",
      "키타",
      "봇치",
      "료",
      "니지카",
    ];
  }
  generateName() {
    return this.names[util.getRandByLen(this.names)];
  }
  getRandomName() {
    const randomLastName =
      this.lastname[Math.floor(Math.random() * this.lastname.length)];
    const randomfirstName =
      this.firstname[Math.floor(Math.random() * this.firstname.length)];

    return randomLastName + randomfirstName;
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
    const month = util.plusZero(util.getRandomInRange(1, 12));
    const day = util.plusZero(util.getRandomInRange(1, 30));
    //01,02 등은 어떻게 만들어놓을까?
    //유틸에 아에 0을 붙여주는 함수를 만들기로 함

    return `${year}-${month}-${day}`;
  }
}
class AgeGenerator {
  getAge(birthday) {
    const year = birthday.slice(0, 4);
    return 2024 - year;
  }
}

class UserGenerator {
  constructor() {
    this.idGen = new IdGen();
    this.nameGen = new NameGenerator();
    this.ageGen = new AgeGenerator();
    this.birthGen = new BirthdateGenerator();
    this.genderGen = new GenderGenerator();
    this.addressGen = require("./AddressGen");
  }

  generateUserData(count) {
    //클래스 호출과 객체 호출의 차이 <- addressGen안의 함수를 직접 가져오느냐 클래스를 가져와서 초기화 시키느냐 차이
    const addrGen = new this.addressGen();
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.idGen.getUuid();
      const name = this.nameGen.getRandomName();
      const gender = this.genderGen.generateGender();
      const birthday = this.birthGen.generateBirthdate();
      const age = this.ageGen.getAge(birthday);
      const address = addrGen.generateAddress();
      data.push([id, name, gender, age, birthday, address]);
    }
    return data;
  }
}
module.exports = UserGenerator;
