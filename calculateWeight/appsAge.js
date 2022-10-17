function howOld(age, year) {
  let theCurrentYear = 2022;
  const yearDifference = year - theCurrentYear;
  const newAge = age + yearDifference;
  if (newAge < 0) {
    return `The year ${year} was ${Math.abs(yearDifference)} years before you were born`;
  } else if (newAge > age) {
    return `You will be ${newAge} in the year ${year}`;
  } else {
    return `You were ${newAge} in the year ${year}`;
  }
}

console.log(howOld(27,2030));
//console.log(howOld(39, 1957));
//console.log(howOld(46,2022));
