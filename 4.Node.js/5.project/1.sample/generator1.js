const names = ["John", "jane", "Michael", "Emily", "William"];
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Philadelphia",
];
//이름 두개 만들어서 조합하는 식으로도가능
function generateName() {
  return names[Math.floor(Math.random() * names.length)];
}

//성별
function generateGender() {
  return Math.random() < 0.5 ? "남성" : "여성";
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (min - max)) + min;
}

function generateBirthdate() {
  //yyyy-mm-dd 포맷으로 반환
  //1960 - 2010
  const year = getRandomInRange(1960, 2010);
  // const month = Math.floor(Math.random() * 12);
  const month = plusZero(Math.floor(Math.random() * 12) + 1);
  const day = plusZero(Math.floor(Math.random() * 30) + 1);
  // return new Date(year, month, day);
  //01,02 등은 어떻게 만들어놓을까?

  return `${year}-${month}-${day}`;
}
function plusZero(number) {
  if (number < 10) {
    return "0" + String(number);
  } else return String(number);
}
function generateAddress() {
  //1~100까지 번지수를 붙인 주소 생성
  const randBunji = Math.floor(Math.random() * 100 + 1);
  return (
    cities[Math.floor(Math.random() * cities.length)] + " " + randBunji + "번지"
  );
}

for (let i = 0; i < 10; i++) {
  console.log(
    generateName(),
    generateGender(),
    generateBirthdate(),
    generateAddress()
  );
}

const userdb = [];

for (let i = 0; i < 100; i++) {
  userdb.push([
    generateName(),
    generateGender(),
    generateBirthdate(),
    generateAddress(),
  ]);
}
for (const user of userdb) {
  console.log(user);
}

//csv 형태로 파일에 저장하시오.

const csvWriter = require("./csv");
const filePath = "user.csv";

csvWriter(filePath, userdb, (err) => {
  if (err) {
    console.log("파일 쓰기 실패", err.message);
  }
});

// =================== 여기서부터를 상점 =======================
class NameGenerator {}

class User {}

// ================== 여기서부터 아이템 ======================
