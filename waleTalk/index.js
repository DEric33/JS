let input = "turpentine and turtles";
const vowels = ["a", "e", "i", "o", "u", "y"];
let resultArray = [];
for (i = 0; i < input.length; i++) {
  // console.log(i);
  for (j = 0; j < vowels.length; j++) {
    //console.log('j is '+ j);
    if (input[i] === vowels[j]) {
      let upper = input[i].toUpperCase();
      console.log(input[i]);
      resultArray.push(upper);
      if (input[i] === "e" || input[i] === "u") {
        resultArray.push(upper);
      }
    }
  }
}
console.log(resultArray.join(""));
