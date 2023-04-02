// for prompt
const prompt = require("prompt-sync")({sigint: true});

// ask the name
let userName = prompt('Please enter your name : ','Stranger');
userName ? console.log(`Hello ${userName}!`) : console.log("Hello!");

// ask the question
let userQuestion = prompt('What is your question : ','Where is the armadillo ?');
console.log(`You ${userName} asked ${userQuestion}`);

// build the random and tell the answer
let randomNumber = Math.floor(Math.random() * 8);
console.log('My answer will be simple !!');
console.log();
let eightBall = "";
switch (randomNumber) {
  case 0:
    console.log("It is certain");
    break;
  case 1:
    console.log("It is decidedly so'");
    break;
  case 2:
    console.log("Reply hazy try again");
    break;
  case 3:
    console.log("Cannot predict now");
    break;
  case 4:
    console.log("Do not count on it");
    break;
  case 5:
    console.log("My sources say no");
    break;
  case 6:
    console.log("Outlook not so good");
    break;
  case 7:
    console.log("Signs point to yes");
    break;
  default:
    console.log("Not now");
    break;
}
