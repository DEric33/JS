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
var maxCage = 25; // nb max par cage
var caisse = 50; // 50 euros en caisse de départ
var prixCaisse; // tarif caisse entre 5 et 8 euros
var prixCarottes; // tarif carottes entre 2 et 4 euros le kilo
var prixLitre; // tarif entre .5 et 1.5
//var coeffRep = 4; // multiplicateur de reproduction
var periode = 4; // nb de mois d'exploitation : 13 = 1 an , 25 = 2 ans ...
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

function toContinue(sRabbit,sex){
  if(sRabbit==0){
    console.log("You have lost ! Without rabbits "+sex+" you can't continue reproduction !");
    return periode; // end of game
  }
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

// eau potentiellement consommée
function availableWater(adults,smalls) {
  return adults * consoEauAdulte +
  smalls * consoEauPetit;
}

// console.clear(); doesn't work on windows

for (month = 1; month < periode; month++) {
  //console.log(month);

  // nb d'adultes
  console.log("Males : " + aMales);
  console.log("Cage(s) Males : "+ mCages);
  console.log("Males par cage : "+ Math.trunc(aMales/mCages));
  console.log("Femelles : " + aFemelles);
  console.log("Cage(s) Femelles : "+fCages);
  console.log("Femelles par cage : "+ Math.trunc(aFemelles/fCages));

  // avant accouplements, calcul des consos du cheptel actuel
  
  eau -= availableWater(aMales + aFemelles , pMales + pFemelles);

// si eau < 0 , calcul de morts
// nbMorts = eau / consoEauAdulte
// nbMortsMales = nbMorts / 2;
// nbMortsFemelles = nbMorts - nbMortsMales:
//  eau = 0;
//  aMales -= nbMortsMales;
//  aFemelles -= nbMortsFemelles
if (eau<0) {
  var nbMorts = Math.abs(eau / consoEauAdulte);
  var nbMortsMales = nbMorts / 2;
  var nbMortsFemelles = nbMorts - nbMortsMales;
  eau = 0;
  aMales -= nbMortsMales.toFixed(0);
  if(aMales<0){
    console.log("Tous les males adultes sont morts ce mois ci !");
    aMales = 0;
  }
  aFemelles -= nbMortsFemelles.toFixed(0);
  if(aFemelles<0){
    console.log("Toutes les femelles adultes sont mortes ce mois ci !");
    aFemelles = 0;
  }
}
console.log("Eau disponible : " + eau + " l");


  carottes -=
    (aMales + aFemelles) * consoCarotteAdulte +
    (pMales + pFemelles) * consoCarottePetit;

// si carottes < 0 , calcul nb morts
// nbMorts = carottes / consoCarottesAdulte
// nbMortsMales = nbMorts / 2;
// nbMortsFemelles = nbMorts - nbMortsMales:
//  carottes = 0;
//  aMales -= nbMortsMales;
//  aFemelles -= nbMortsFemelles

// debug
//console.log("Nb males avant deduction carottes : "+aMales);
//console.log("Nb femelles avant deduction carottes : "+aFemelles);

  if(carottes<0){
    var nbMorts = Math.abs(carottes / consoCarotteAdulte);
    var nbMortsMales = nbMorts / 2;
    var nbMortsFemelles = nbMorts - nbMortsMales;
    carottes = 0;
    aMales -= nbMortsMales.toFixed(0);
    if(aMales<0){
      console.log("Tous les males adultes sont morts ce mois ci !");
      aMales = 0;
    }
    aFemelles -= nbMortsFemelles.toFixed(0);
    if(aFemelles<0){
      console.log("Toutes les femelles adultes sont mortes ce mois ci !");
      aFemelles = 0;
    }
  }

  console.log("Carottes disponibles : " + carottes + " kg");


 // verifCarottes(aMales,aFemelles,pMales,pFemelles);

// debug
console.log("Nb males apres deduction carottes : "+aMales);
console.log("Nb femelles apres deduction carottes : "+aFemelles);

console.log();

  

  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");

  prixCaisse = getRandom(5, 8);
  prixCarottes = getRandom(2, 4);
  prixLitre = getRandom(50, 150) / 100;
  prixFemelle = getRandom(300,600) / 100;
  prixMale = getRandom(250,500) / 100;

  /****************/
  /**** VENTES ****/
  /****************/

/* N'a pas de sens sur le mois 1 ... male ou femelle = 0 <=> fin de partie*/
if(month != 1 && aMales > 0 && aFemelles > 0){
  console.log("******************************************");
  console.log("***               VENTES               ***");
  console.log("******************************************");

 // mVente = rabbitSale(prixMale.toFixed(2))


  console.log("Le prix d'un lapin male adulte est de " + prixMale.toFixed(2) + " €");
  do {
    mVente = readlineSync.question(
      "Combien voulez-vous vendre de males ? "
    );
  } while (mVente > aMales);
  caisse += mVente * prixMale;
  aMales -= mVente;

  console.log();

  console.log("Le prix d'une lapine femelle adulte est de " + prixFemelle.toFixed(2) + " €");
  do {
    fVente = readlineSync.question(
      "Combien voulez-vous vendre de femelles ? "
    );
  } while (fVente > aFemelles);
  caisse += fVente * prixFemelle;
  aFemelles -= fVente;
}

if(aMales > 0 && aFemelles > 0){
  /***********************/
  /**** ACCOUPLEMENTS ****/
  /***********************/
  console.log("******************************************");
  console.log("***          ACCOUPLEMENTS             ***");
  console.log("******************************************");
  do {
    accoup = readlineSync.question("Combien d'accouplement(s) ? ");
  } while ((accoup > aMales) || (accoup > aFemelles) || (accoup === "")); // nb accouplements doit etre <= nb max de malles ou de femelles
}

  /****************/
  /**** ACHATS ****/
  /****************/
  console.log("******************************************");
  console.log("***              ACHATS                ***");
  console.log("******************************************");

  if(prixCaisse<caisse){
  console.log("Le prix d'un casier est de " + prixCaisse.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    mAchatCaisse = readlineSync.question(
      "Combien voulez-vous acheter de caisses pour les males ? "
    );
  } while ((mAchatCaisse * prixCaisse > caisse) || (mAchatCaisse === ""));
  caisse -= mAchatCaisse * prixCaisse;
  mCages += mAchatCaisse * 1; // multiplier par 1 force l'integer, sinon passe en concatenation
  // debug
  console.log("machatCaisse = "+mAchatCaisse);
  console.log("mCages = "+mCages);
  // f debug
} else {
  console.log("Pas assez de liquidités pour acheter un casier pour les males");
}

  console.log();
  
  if(prixCaisse<caisse){
    console.log("Le prix d'un casier est de " + prixCaisse.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    fAchatCaisse = readlineSync.question(
      "Combien voulez-vous acheter de caisses pour les femelles ? "
    );
  } while ((fAchatCaisse * prixCaisse > caisse) || (fAchatCaisse === ""));
  caisse -= fAchatCaisse * prixCaisse;
  fCages += fAchatCaisse * 1; // multiplier par 1 force l'integer, sinon passe en concatenation
} else {
  console.log("Pas assez de liquidités pour acheter un casier pour les femelles");
}

  console.log();
  
  if(prixCarottes<caisse){
    console.log("Le prix d'un kilo de carottes est de " + prixCarottes.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    achatCarottes = readlineSync.question(
      "Combien voulez-vous acheter de kilos de carottes ? "
    );
  } while ((achatCarottes * prixCarottes > caisse) || (achatCarottes === ""));
  caisse -= achatCarottes * prixCarottes;
  carottes += achatCarottes * 1;
} else {
  console.log("Pas assez de liquidités pour acheter un kilo de carottes");
}

  console.log();
  
  if(prixLitre<caisse){
    console.log("Le prix du litre d'eau est de " + prixLitre.toFixed(2) + " €");
  console.log("L'argent disponible en caisse est de " + caisse.toFixed(2) + " €");
  do {
    achatLitres = readlineSync.question(
      "Combien voulez-vous acheter de litres d'eau ? "
    );
  } while ((achatLitres * prixLitre > caisse) || (achatLitres === ""));
  caisse -= achatLitres * prixLitre;
  eau += achatLitres * 1;
} else {
  console.log("Pas assez de liquidités pour acheter un litre d'eau");
}

  // portee minimale => 2 / maximale => 10
  portee = Math.round(accoup * getRandom(2, 10));

  // repartition pm/pf
  pFemelles = Math.round(portee / 2);
  pMales = portee - pFemelles;

  console.log("Lapinettes : " + pFemelles);
  console.log("Lapinots : " + pMales);
  console.log();
  console.log("*** ============ ***");
  console.log();

  // pour round suivant -- SAUF DERNIER TOUR
  aMales += pMales;
  aFemelles += pFemelles;

  toContinue(aMales+pMales,"Males");
  toContinue(aFemelles+pFemelles,"Femelles");
  

  
}
