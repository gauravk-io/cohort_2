var a = "Gaurav";
var b = "Kumar";
let male = 1;
console.log(`Good morning ${a} ${b}`);
// ------------------------
let sum = 0;
for (let i = 0; i <= 1000; i++) {
    sum = sum + i;
}
console.log(sum);
// ------------------------
if (male) {
    console.log("Good Morning Sir!")
} else {
    console.log("Good Morning Mam!")
}
// ------------------------



let arr = [1, 2, 3, 4, 34, 34, 65, 65, 76, 278, 488, 5732, 7, 8];
let maxNum = arr[0];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxNum) {
        maxNum = arr[i];
    };
};
console.log(maxNum);

// ----------------------------


const allUser = [
    {
        firstName: "Gaurav1",
        lastName: "Kumar1",
        gender: "male"
    },
    {
        firstName: "Gaurav2",
        lastName: "Kumar2",
        gender: "female"
    },
    {
        firstName: "Gaurav3",
        lastName: "Kumar3",
        gender: "male"
    },
    {
        firstName: "Gaurav4",
        lastName: "Kumar4",
        gender: "male"
    },
    {
        firstName: "Gaurav5",
        lastName: "Kumar5",
        gender: "male"
    },
    {
        firstName: "Gaurav6",
        lastName: "Kumar6",
        gender: "male"
    }

]

for (let i = 0; i < allUser.length; i++) {
    if (allUser[i]["gender"] == "male") {
        console.log(allUser[i]["firstName"]);

        console.log(allUser[i].firstName)
    }
}
// ------------------------------------------------

function sum1(a, b) {
    const sumValue = a + b;
    return sumValue;
}

console.log(sum1(1, 23));
// ----------------------------------

function sum2(num1, num2, fnToCall) {
    let result = num1 + num2;
    fnToCall(result);
}

function displayResult(data) {
    console.log("Result of the sum is : " + data);
}

function displayResultPassive(data) {
    console.log("Sums result is : " + data);
}

// You are allowed to call one function after this
// How will you diplayResult of as sum 

const ans = sum2(1, 2, displayResult)
// Callbacks

// ------------------------------------------------
// Create a counter in js (count down from 30 to 0)
let counter = 30;
let time = setInterval(() => {
    console.log(counter);
    counter--;
    if (counter < 0) clearInterval(time);
}, 1000);

// calculate the time it takes between call and the inner function actually running 

let start = Date.now();
setTimeout(() => {
    let delay = Date.now() - start;
    console.log(`Delay: ${delay}`)
}, 1000);

// create a terminal clock (HH:MM:SS)

setInterval(() => {
    let now = new Date();

    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    console.log(`${hours}:${minutes}:${seconds}`)

}, 1000);