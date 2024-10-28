class NameGenerator {
  constructor() {
    this.names = ["John", "jane", "Michael", "Emily", "William"];
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
    this.cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Philadelphia",
    ];
  }
  generateAddress() {
    //1~100까지 번지수를 붙인 주소 생성
    const randBunji = Math.floor(Math.random() * 100 + 1);
    return (
      this.cities[Math.floor(Math.random() * this.cities.length)] +
      " " +
      randBunji +
      "번지"
    );
  }
}

class UserGenerator {
  constructor() {
    this.nameGen = new NameGenerator();
    this.birthGen = new BirthdateGenerator();
    this.genderGen = new GenderGenerator();
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const name = this.nameGen.generateName();
      const birthday = this.birthGen.generateBirthdate();
      const gender = this.genderGen.generateGender();
      const address = this.addressGen.generateAddress();
      data.push([name, gender, birthday, address]);
    }
    return data;
  }
}

const userGenerator = new UserGenerator();
const users = userGenerator.generateData(5);

// console.log(users);

class DataPrinter {
  constructor(data) {
    this.data = data;
  }
  printData() {
    for (const [name, gen, bir, addr] of this.data) {
      console.log(
        `이름: ${name}, 생년월일: ${bir}, 성별: ${gen}, 주소: ${addr}`
      );
    }
  }
  printHTML() {
    console.log("HTML로 내보내기 완료");
  }
  writeToCSV() {
    console.log("csv파일에 저장 완료");
  }
}
const dataPrinter = new DataPrinter(users);
dataPrinter.printData();

//내가 쓸 함수를 위해 상속을 해서 가져다 씀 : 그런데 구조적으로 그게 맞나?
// class DataPrinter extends UserGenerator {
//   printData(count) {
//     const data = this.generateData(count);
//     for (const [name, bir, gen, addr] of data) {
//       console.log(
//         `이름: ${name}, 생년월일: ${bir}, 성별: ${gen}, 주소: ${addr}`
//       );
//     }
//   }
// }
