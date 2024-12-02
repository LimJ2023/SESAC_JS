console.log("code goes here...");
function add1(n1, n2, showResult, resultPhrase) {
    // if(typeof n1 === "number" && typeof n2 === "number") {
    //     throw new Error("Incorrect input!")
    // }
    var result = n1 + n2;
    if (showResult) {
        console.log(resultPhrase + result);
    }
    return result;
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = "Result is : ";
var result = add1(number1, number2, printResult, resultPhrase);
console.log(result);
