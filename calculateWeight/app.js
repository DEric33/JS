// Write your function here:

function calculateWeight(earthWeight, planet) {
  if (planet == "") {
    return console.log(" Invalid Planet Entry.");
  } else {
    switch (planet) {
      case "Mercure":
        return earthWeight * 0.378;
        break;
      case "Venus":
        return earthWeight * 0.907;
        break;
      case "Mars":
        return earthWeight * 0.377;
        break;
      case "Jupiter":
        return earthWeight * 2.36;
        break;
      case "Saturne":
        return earthWeight * 0.916;
        break;
      default:
        console.log(
          "Invalid Planet Entry. Try: Mercury, Venus, Mars, Jupiter, or Saturn."
        );
    }
  }
}

// Uncomment the line below when you're ready to try out your function
//console.log(calculateWeight(100, 'Jupiter2')) // Should print 236
console.log(calculateWeight(100, 0)); // Should print 236

// We encourage you to add more function calls of your own to test your code!
