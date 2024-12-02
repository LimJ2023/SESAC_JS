// const person: {
//     name: string;
//     age: number;
// } 
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number,string]; // 튜플 타입. 정해진 고정 배열을 지정함

// } 
enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
    name: "Maximilian",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN,
}
// person.role[1] = 10;
// person.role = [0,"admin"];

let favoriteActivities: string[];
favoriteActivities = ["sports"];

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby);
}


console.log()