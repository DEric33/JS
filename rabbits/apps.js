const { clear } = require("console");
const { stdout } = require("process");
const { clearScreenDown } = require("readline");
var readlineSync = require("readline-sync");

const maxCage = 25; // nb max par cage
const consoEauAdulte = 2; // 2 litres par mois par adulte
const consoCarotteAdulte = 3; // 3 kilos par mois par adulte
const consoEauPetit = 1; // 1 litres par mois par petit
const consoCarottePetit = 1.5; // 1.5 kilos par mois par petit
const periode = 4; // nb de mois d'exploitation : 13 = 1 an , 25 = 2 ans ...

var aMales = 1;
var pMales = 0;
var aFemelles = 1;
var pFemelles = 0;
var portee = 0; // nb de petits
var accoup = 0; // nb accouplements
//// VERIF USE ---- var pf = 0; // nb petites femelles
//// VERIF USE ---- var pm = 0; // nb petits males
var eau = 20; // 20 litres d'eau
var carottes = 30; // 30 kilos de carottes
var mCages = 1; // nb cages males
var fCages = 1; // nb cages femelles
var caisse = 50; // 50 euros en caisse de départ
var prixCaisse; // tarif caisse entre 5 et 8 euros
var prixCarottes; // tarif carottes entre 2 et 4 euros le kilo
var prixLitre; // tarif entre .5 et 1.5
var debug = 1; // 0: normal / 1: debug

/**Functions List
 * getRandom        generate interval between min and max value.. for price for example
 * toContinue       without male or female, game over
 * verifCarottes    is it food ?
 * availableWater   is it water ?
 * alertNotEnough   no more food or water or money
 * state            print rabbits station
 * allDeath         print death and why
 * printBank        how much money
 * printPrice       print price of things
 * gameVariables    calculate prices, conso by rabbit...
 */

// nb aleatoire par : portee , tarif casier
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toContinue(sRabbit, sex) {
  if (sRabbit == 0) {
    console.log(
      "You have lost ! Without rabbits " +
        sex +
        " you can't continue reproduction !"
    );
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
function verifCarottes(aMales, pMales, aFemelles, pFemelles) {
  let adultes = aMales + aFemelles;
  let petits = pMales + pFemelles;
  let simule = adultes * consoCarotteAdulte + petits * consoCarottePetit;
  return console.log("Simule = " + simule);
}

// eau potentiellement consommée
function availableWater(adults, smalls) {
  return adults * consoEauAdulte + smalls * consoEauPetit;
}

function alertNotEnough(who) {
  let msg = "Pas assez de liquidités pour acheter un "+ who;
  return msg;
}

function state(month) {
  //console.clear(); // work on windows with terminal, not with git bash
  let space;
  console.log();
  console.log("**********************************");
  space = month > 9 ? "*" : "**" ;
  console.log("************ Mois "+ month + "  ***********" + space);
  console.log("**********************************");
  console.log();
  console.log(`Males adultes : ${aMales}`);
  console.log(`Petits males : ${pMales}`);
  console.log(`Cage(s) Males : ${mCages}`);
  console.log(`Males par cage : ${Math.trunc((aMales+pMales) / mCages)}`);
  console.log();
  console.log(`Femelles adultes : ${aFemelles}`);
  console.log(`Petites femelles : ${pFemelles}`);
  console.log(`Cage(s) Femelles : ${fCages}`);
  console.log(`Femelles par cage : ${Math.trunc((aFemelles+pFemelles) / fCages)}`);
  console.log();
  console.log(`${eau} litre(s) d'eau`);
  console.log(`${carottes} kilo(s) de nourriture`);
  console.log();
  console.log("**********************************");
}

function allDeath(sex,why){
  let msg = `${sex} adultes sont mort${why} ce mois ci !`;
  return msg;
}

function printBank() {
/*  let msg = "L'argent disponible en caisse est de " + caisse.toFixed(2) + " €";*/
  let msg = `L'argent disponible en caisse est de ${caisse.toFixed(2)} €`;
  return msg;
}

function printPrice(what,how) {
  let msg = `Le prix ${what} est de ${how} €`;
  return msg;
}

function gameVariables(){
  /* Generate month variables */
  prixCaisse = getRandom(5, 8);
  prixCarottes = getRandom(2, 4);
  prixLitre = getRandom(50, 150) / 100;
  prixFemelle = getRandom(300, 600) / 100;
  prixMale = getRandom(250, 500) / 100;
}

function foodDeath(foodType, byRabbit){
  let nbMorts = foodType / byRabbit;
  let nbMortsMales = Math.abs(nbMorts / 2);
  let nbMortsFemelles = Math.abs(nbMorts - nbMortsMales);
  aMales -= nbMortsMales.toFixed(0);
  aFemelles -= nbMortsFemelles.toFixed(0);
}






for (month = 1; month < periode; month++) {

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


  //console.log(month);

  // number of rabbits and cages in month x
  //state(month);

  // avant accouplements, calcul des consos du cheptel actuel
  eau -= availableWater(aMales + aFemelles, pMales + pFemelles);

  // si eau < 0 , calcul de morts
  // nbMorts = eau / consoEauAdulte
  // nbMortsMales = nbMorts / 2;
  // nbMortsFemelles = nbMorts - nbMortsMales:
  //  eau = 0;
  //  aMales -= nbMortsMales;
  //  aFemelles -= nbMortsFemelles
  if (eau < 0) {
    foodDeath(eau,consoEauAdulte);
    eau = 0;
    if (aMales < 0) {
      console.log(allDeath("Tous les males","s de soif"));
      aMales = 0;
    }
    if (aFemelles < 0) {
      console.log(allDeath("Toutes les femelles","es de soif"));
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

  if (carottes < 0) {
    foodDeath(carottes,consoCarotteAdulte);
    carottes = 0;
    if (aMales < 0) {
      console.log(allDeath("Tous les males","s de faim"));
      aMales = 0;
    }
    if (aFemelles < 0) {
      console.log(allDeath("Toutes les femelles","es de faim"));
      aFemelles = 0;
    }
  }

  console.log("Carottes disponibles : " + carottes + " kg");

  // verifCarottes(aMales,aFemelles,pMales,pFemelles);

  // debug
  console.log("Nb males apres deduction eau et carottes : " + aMales);
  console.log("Nb femelles apres deduction eau et carottes : " + aFemelles);

  console.log();

  // number of rabbits and cages in month x
  state(month);

  // money in bank at this stage
  console.log(printBank());

  gameVariables();
 
  /****************/
  /**** VENTES ****/
  /****************/

  /* N'a pas de sens sur le mois 1 ... male ou femelle = 0 <=> fin de partie*/
  if (month != 1 && aMales > 0 && aFemelles > 0) {
    console.log("******************************************");
    console.log("***               VENTES               ***");
    console.log("******************************************");

    // mVente = rabbitSale(prixMale.toFixed(2))

    console.log();
    console.log(printPrice("d'un lapin male",prixMale.toFixed(2)));
    do {
      mVente = readlineSync.question("Combien voulez-vous vendre de males ? ");
    } while (mVente > aMales);
    caisse += mVente * prixMale;
    aMales -= mVente;

    console.log();
    console.log(printPrice("d'une lapine femelle",prixFemelle.toFixed(2)));
    do {
      fVente = readlineSync.question(
        "Combien voulez-vous vendre de femelles ? "
      );
    } while (fVente > aFemelles);
    caisse += fVente * prixFemelle;
    aFemelles -= fVente;
  }

  if (aMales > 0 && aFemelles > 0) {
    /***********************/
    /**** ACCOUPLEMENTS ****/
    /***********************/
    console.log();
    console.log("******************************************");
    console.log("***          ACCOUPLEMENTS             ***");
    console.log("******************************************");
    do {
      accoup = readlineSync.question("Combien d'accouplement(s) ? ");
    } while (accoup > aMales || accoup > aFemelles || accoup === ""); // nb accouplements doit etre <= nb max de malles ou de femelles
  }

  /****************/
  /**** ACHATS ****/
  /****************/
  if(!debug)
    {console.clear();}
  console.log();
  console.log("******************************************");
  console.log("***              ACHATS                ***");
  console.log("******************************************");

  if (prixCaisse < caisse) {
    console.log(printPrice("d'un casier",prixCaisse.toFixed(2)));
    console.log(printBank());
    do {
      mAchatCaisse = readlineSync.question(
        "Combien voulez-vous acheter de caisses pour les males ? "
      );
    } while (mAchatCaisse * prixCaisse > caisse || mAchatCaisse === "");
    caisse -= mAchatCaisse * prixCaisse;
    mCages += mAchatCaisse * 1; // multiplier par 1 force l'integer, sinon passe en concatenation
    // debug
    //console.log("machatCaisse = " + mAchatCaisse);
    //console.log("mCages = " + mCages);
    // f debug
  } else {
    console.log(alertNotEnough("casier pour les males"));
  }

  console.log();

  if (prixCaisse < caisse) {
    console.log(printPrice("d'un casier",prixCaisse.toFixed(2)));
    console.log(printBank());
    do {
      fAchatCaisse = readlineSync.question(
        "Combien voulez-vous acheter de caisses pour les femelles ? "
      );
    } while (fAchatCaisse * prixCaisse > caisse || fAchatCaisse === "");
    caisse -= fAchatCaisse * prixCaisse;
    fCages += fAchatCaisse * 1; // multiplier par 1 force l'integer, sinon passe en concatenation
  } else {
    console.log(alertNotEnough("casier pour les femelles"));
      //"Pas assez de liquidités pour acheter un casier pour les femelles"
    
  }

  console.log();

  if (prixCarottes < caisse) {
    console.log(printPrice("d'un kilo de carottes",prixCarottes.toFixed(2)));
    console.log(printBank());
    do {
      achatCarottes = readlineSync.question(
        "Combien voulez-vous acheter de kilos de carottes ? "
      );
    } while (achatCarottes * prixCarottes > caisse || achatCarottes === "");
    caisse -= achatCarottes * prixCarottes;
    carottes += achatCarottes * 1;
  } else {
    console.log(alertNotEnough("kilo de carottes"));
  }

  console.log();

  if (prixLitre < caisse) {
    console.log(printPrice("d'un litre d'eau",prixLitre.toFixed(2)));
    console.log(printBank());
    do {
      achatLitres = readlineSync.question(
        "Combien voulez-vous acheter de litres d'eau ? "
      );
    } while (achatLitres * prixLitre > caisse || achatLitres === "");
    caisse -= achatLitres * prixLitre;
    eau += achatLitres * 1;
  } else {
    console.log(alertNotEnough("litre d'eau"));
  }


  // pour round suivant -- 
  aMales += pMales;
  pMales = 0;
  aFemelles += pFemelles;
  pFemelles = 0;
  
  toContinue(aMales + pMales, "Males");
  toContinue(aFemelles + pFemelles, "Femelles");
}

state(13);