const { clear } = require("console");
var readlineSync = require("readline-sync");

var aMales = 1;
var pMales = 0;
var aFemelles = 1;
var pFemelles = 0;
var eau = 20; // 20 litres d'eau
var carottes = 30; // 30 kilos de carottes
var mCages = 1; // nb cages males
var fCages = 1; // nb cages femelles
var caisse = 50; // 50 euros en caisse de départ
var prixCaisse; // tarif caisse entre 5 et 8 euros
var prixCarottes; // tarif carottes entre 2 et 4 euros le kilo
var prixLitre; // tarif entre .5 et 1.5
//var coeffRep = 4; // multiplicateur de reproduction
var periode = 5; // nb de mois d'exploitation : 13 = 1 an , 25 = 2 ans ...
var portee = 0; // nb de petits
var accoup = 0; // nb accouplements
var pf = 0; // nb petites femelles
var pm = 0; // nb petits males
var consoEauAdulte = 2; // 2 litres par mois par adulte
var consoCarotteAdulte = 3; // 3 kilos par mois par adulte
var consoEauPetit = 1; // 1 litres par mois par petit
var consoCarottePetit = 1.5; // 1.5 kilos par mois par petit

// nb aleatoire par : portee , tarif casier
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// mortalité manque carottes
/* si conso cheptel superieur kg carottes
    calcule combien de lapins sont nourris
    deduit nb de morts
    repartition => 2/3 petits 1/3 adultes // 1/2 M/F
    => entree et sortie : aMales pMales aFemelles pFemelles 
 */
function verifCarottes(aMales,pMales,aFemelles,pFemelles){
  var adultes = aMales + aFemelles;
  var petits =  pMales + pFemelles;
  var simule = (adultes * consoCarotteAdulte) + (petits * consoCarottePetit);
  return console.log("Simule = "+simule);
}

//console.log(getRandomPortee(2,10));

console.clear;

for (month = 1; month < periode; month++) {
  //console.log(month);

  // nb d'adultes
  console.log("Males : " + aMales);
  console.log("Femelles : " + aFemelles);

  // avant accouplements, calcul des consos du cheptel actuel
  eau -=
    (aMales + aFemelles) * consoEauAdulte +
    (pMales + pFemelles) * consoEauPetit;
  console.log("Eau disponible : " + eau + " l");

  carottes -=
    (aMales + aFemelles) * consoCarotteAdulte +
    (pMales + pFemelles) * consoCarottePetit;
  console.log("Carottes disponibles : " + carottes + " kg");


  verifCarottes(aMales,aFemelles,pMales,pFemelles);



  

  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");

  do {
    accoup = readlineSync.question("Combien d'accouplement(s) ? ");
  } while (accoup > aMales); // nb accouplements doit etre <= nb max de malles ou de femelles

  prixCaisse = getRandom(5, 8);
  prixCarottes = getRandom(2, 4);
  prixLitre = getRandom(50, 150) / 100;

  console.log("Le prix d'un casier est de " + prixCaisse.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    mAchatCaisse = readlineSync.question(
      "Combien voulez-vous acheter de caisses pour les males ? "
    );
  } while (mAchatCaisse * prixCaisse > caisse);
  caisse -= mAchatCaisse * prixCaisse;

  console.log("Le prix d'un casier est de " + prixCaisse.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    fAchatCaisse = readlineSync.question(
      "Combien voulez-vous acheter de caisses pour les femelles ? "
    );
  } while (fAchatCaisse * prixCaisse > caisse);
  caisse -= fAchatCaisse * prixCaisse;

  console.log("Le prix d'un kilo de carottes est de " + prixCarottes.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    achatCarottes = readlineSync.question(
      "Combien voulez-vous acheter de kilos de carottes ? "
    );
  } while (achatCarottes * prixCarottes > caisse);
  caisse -= achatCarottes * prixCarottes;

  console.log("Le prix du litre d'eau est de " + prixLitre.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    achatLitres = readlineSync.question(
      "Combien voulez-vous acheter de litres d'eau ? "
    );
  } while (achatLitres * prixLitre > caisse);
  caisse -= achatLitres * prixLitre;

  // portee minimale => 2 / maximale => 10
  portee = Math.round(accoup * getRandom(2, 10));

  //console.log("Nb petits : " + portee);

  // repartition pm/pf
  pFemelles = Math.round(portee / 2);
  pMales = portee - pFemelles;

  console.log("Lapinettes : " + pFemelles);
  console.log("Lapinots : " + pMales);
  console.log();
  console.log("*** ============ ***");
  console.log();

  // pour round suivant
  aMales += pMales;
  aFemelles += pFemelles;
}
