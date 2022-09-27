const { clear } = require("console");
var readlineSync = require("readline-sync");

var aMales = 1;
var pMales = 0;
var aFemelles = 1;
var pFemelles = 0;
var coeffRep = 4; // multiplicateur de reproduction
var periode = 5; // nb de mois d'exploitation : 13 = 1 an , 25 = 2 ans ...
var portee = 0; // nb de petits
var accoup = 0; // nb accouplements
var pf = 0; // nb petites femelles
var pm = 0; // nb petits males
var eau = 10; // 10 litres d'eau
var carottes = 5; // 5 kilos de carottes
var consoEauAdulte = 2; // 2 litres par mois par adulte
var consoCarotteAdulte = 3; // 3 kilos par mois par adulte
var consoEauPetit = 1.5; // 1.5 litres par mois par adulte
var consoCarottePetit = 2.2; // 2.2 kilos par mois par adulte

console.clear;

for (month = 1; month < periode; month++) {
  //console.log(month);

    // nb d'adultes
    console.log("Males : "+aMales);
    console.log("Femelles : "+aFemelles);

// avant accouplements, calcul des consos du cheptel actuel
eau -= ((aMales + aFemelles) * consoEauAdulte) + ((pMales + pFemelles) * consoEauPetit);
console.log(eau);

do {

    accoup = readlineSync.question("Combien d'accouplement(s) ? ");

    // nb accouplements doit etre <= nb max de malles ou de femelles

    // portee = Math.round((accoup * coeffRep) + (accoup * coeffRep * Math.random()));
    //portee = Math.round(accoup * Math.random()) + Math.round(accoup * coeffRep * Math.random());
    portee = Math.round(accoup * coeffRep * Math.random());
    // portee minimale => 1
    if (portee == 0) {
      portee = 1;
    }
  } while (accoup > aMales);

  console.log("Nb petits : " + portee);

  // repartition pm/pf
  pFemelles = Math.round(portee/2);
  pMales = portee - pFemelles;

  // sinon on reste a 1 male tout le temps
  if(pMales==0){pMales=1;}

  console.log("Lapinettes : "+pFemelles);
  console.log("Lapinots : "+pMales);

  // pour round suivant
  aMales += pMales;
  aFemelles += pFemelles;

}

//const input = require('readline-sync');

//let info = input.question("Question text... ");
