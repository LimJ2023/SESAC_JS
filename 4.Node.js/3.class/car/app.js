const Sedan = require("./Sedan");
const SUV = require("./SUV");
const Parent = require("./Parent");
const Child = require("./Child");

//부모 자녀 객체 생성
const dad = new Parent("철수", 45, "남성");
const daughter = new Child("지연", 10, "여성", "4학년");
const son = new Child("민수", 8, "남성", "2학년");

//가족 차량 생성
const familyCar1 = new Sedan("현대", "그랜저", "검정", 3000);
const familyCar2 = new SUV("현대", "SUV", "빨강", 5000);

//시나리오 실행
familyCar1.start();
dad.getInCar(familyCar1);
dad.driveCar(familyCar1);
daughter.getInCar(familyCar1);
son.getInCar(familyCar1);
daughter.playInCar();
son.playInCar();
familyCar1.openTrunk();
familyCar1.stop();

console.log("=======================");

//시나리오 2
familyCar2.start();
familyCar2.offRoad();
dad.getInCar(familyCar2);
son.getInCar(familyCar2);
son.playInCar();
familyCar2.stop();

//시나리오 3

