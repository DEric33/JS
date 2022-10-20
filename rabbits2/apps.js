const { clear } = require("console");
const { stdout, exit } = require("process");
const { clearScreenDown } = require("readline");
var readlineSync = require("readline-sync");

/* 
************ RABBITS 2 ******************
Array
Initial :
cheptel[]={[[0,1],[0,1],[0,0]],[[1,1],[1,1],[1,0]]}
<=> [sexe,adultes,petits]
*/

/*
Liste des fonctions
state               affiche l'etat du moment
paramStageEau       consommations du mois
paramStageCarottes  consommations du mois
surPop              renvoie nb morts suite a surpopulation
mortalite           mortalite pour faim ou soif
repro               reproduction
affectCaisse        gestion caisse entree et sortie
calculPrix          calcule tarifs eau, carottes, cage
needWaterFood       besoin d'apres cheptel en eau ou en carottes
around              gestion de la virgule
checkQty            verif assez eau ou assez carottes
printPrice          affiche prix des choses
*/
var debug = 1; // 0 = Off   1 = On
var males = [1, 1, 0, 3]; // cage male - nb male adulte dans cages - nb male petit dans cages - tarif base M
var femelles = [1, 1, 0, 4]; // cage femelle - nb femelle adulte dans cages - nb femelle petit dans cages - tarif base F
var varis = [30, 60, 50, 25]; // litre d'eau - kilo de nourriture - argent en caisse - population par cage
var param = [2, 4, 0.6, 0.8, 1, 2, 5, 15, 4, 8]; // conso mois eau adulte male - conso mois carottes adulte male
// - variation conso adulte/petit - variation conso male/femelle
// - tarif base eau - tarif base carotte - tarif base cage - variation tarif +/- en %
// - marge bas reproduction - marge haut reproduction
var paramTmp = [];
var nbRun = 2; //  12 run pour la version FileSystemHandle, soit un an

function state() {
  console.log("                   LAPINERIE ONLINE");
  console.log("*********************************************************");
  console.log("Votre lapinerie dispose de : ");
  console.log(
    males[0] +
      " cage(s) pour les males et " +
      femelles[0] +
      " cage(s) pour les femelles"
  );
  console.log("Les cages sont actuellement occupées par ");
  console.log(
    males[1] + " male(s) adulte(s) et " + males[2] + " petit(s) d'une part "
  );
  console.log(
    "et " +
      femelles[1] +
      " femelle(s) adulte(s) et " +
      femelles[2] +
      " petite(s) d'autre part"
  );
  console.log("*********************************************************");
  console.log("L'occupation est donc de : ");
  console.log(
    (males[1] + males[2]) / males[0] +
      " male(s) par cage et " +
      (femelles[1] + femelles[2]) / femelles[0] +
      " femelle(s) par cage"
  );
  console.log("*********************************************************");
  console.log("                      FOURNITURES");
  console.log(
    "Vous disposez de " +
      varis[0] +
      " litre(s) deau ainsi que " +
      varis[1] +
      " kilo(s) de nourriture"
  );
  console.log("Et votre fond de caisse se monte à " + varis[2] + " euros");
}

/* Consommation Eau */
function paramStageEau() {
  let consoEauMale = param[0];
  let consoEauFemelle = param[0] * param[3];
  let consoEauPMale = param[0] * param[2];
  let consoEauPFemelle = param[0] * param[3] * param[2];
  let eauMois =
    consoEauMale + consoEauFemelle + consoEauPMale + consoEauPFemelle;
  return eauMois;
}

/* Consommation Carottes */
function paramStageCarottes() {
  let consoFoodMale = param[1];
  let consoFoodFemelle = param[1] * param[3];
  let consoFoodPMale = param[1] * param[2];
  let consoFoodPFemelle = param[1] * param[3] * param[2];
  let foodMois =
    consoFoodMale + consoFoodFemelle + consoFoodPMale + consoFoodPFemelle;
  return foodMois;
}

function totalCheptel() {
  if (debug == 1) {
    return 75;
  } else {
    return males[1] + males[2] + femelles[1] + femelles[2];
  }
}

/* Mortalité par surpopulation */ /* A REVOIR !!!!!  FAUX !!! en mode dev en tous cas.. avec de vraies valeurs ca reste a voir */
function surPop(nLapins, nCage) {
  let nbMorts = nLapins - varis[3] * nCage;
  // si nb morts > nb adultes => 2/3 - 1/3 deduire adultes - petits
  // regle applicable sans condition d'exactitude proportionnelle : flou du resultat accepté
  if (nbMorts > males[1] + femelles[1]) {
    males[1] = males[1] / 3;
    males[2] = (males[2] / 3) * 2;
    femelles[1] = femelles[1] / 3;
    femelles[2] = (femelles[2] / 3) * 2;
    return nbMorts;
  } else return 0;
}

// mortalité par faim ou par soif
function mortalite(type) {
  let besoinConso;
  // nb lapins adultes M/F * conso + petits lapins M/F * conso  <<== Necessaire
  /*let besoinConso = males[1] * param[0] + males[2] * param[0] * param[2] +  
                      femelles[1] * param[0] * param[3] + femelles[2] * param[0] * param[2] * param[3];  */
  // factorisaés
  switch (type) {
    case 0:
      besoinConso =
        param[0] *
        (males[1] +
          males[2] * param[2] +
          femelles[1] * param[3] +
          femelles[2] * param[2] * param[3]);
      break;
    case 1:
      besoinConso =
        param[1] *
        (males[1] +
          males[2] * param[2] +
          femelles[1] * param[3] +
          femelles[2] * param[2] * param[3]);
      break;
    default:
      console.log("Erreur");
  }
  // let besoinConso = param[0] * (males[1] + males[2] * param[2] + femelles[1] * param[3] + femelles[2] * param[2] * param[3]);
  //let besoinConso = 60;
  // restant virtuel
  let virtuRest = varis[0] - besoinConso;
  // si restant virtuel <= 0 , kg carottes = 0 , calcul kg manquants , deduire mortalité sur adultes (2/5 M, 3/5 F)

  //  !!!!!!!!!!!! Ca ne prend pas en compte la morta Carottes - varis[1]  !!!!!!!!!!   A REVOIR   !!!!!!
  if (virtuRest <= 0) {
    varis[0] = 0;
    let potMorts = Math.abs(virtuRest) / param[0];

    if (debug == 1) {
      console.log("PotMorts = " + potMorts.toFixed(0));
    }
    males[1] -= (potMorts.toFixed(0) * 2) / 5;
    femelles[1] -= (potMorts.toFixed(0) * 3) / 5;
  }

  // return morts
  return Math.abs(virtuRest);
}

function affectCaisse(direction, somme) {
  //varis[2]
  switch (direction) {
    case 0: // decaisse
      varis[2] -= somme;
      break;
    case 1: // encaisse
      varis[2] += somme;
      break;
    default:
      console.log("ERREUR dans la caisse");
  }
}

function calculPrix(valBase) {
  let min = valBase * (1 - param[7] / 100);
  let max = valBase * (1 + param[7] / 100);
  //     return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function repro(accoup) {
  // entre 4 a 8 laperots par portee
  // repartition : 30 à 70% males
  let petits = [];
  let nbPortee = Math.floor((param[9] - param[8]) * Math.random()) + param[8];
  let repart = Math.floor(40 * Math.random()) + 30; // entre 30 et 70%
  let laRepro = accoup * nbPortee;
  let pM = Math.floor((laRepro * repart) / 100);
  let pF = laRepro - pM;
  if (debug == 1) {
    console.log("nbPortee = " + nbPortee);
    console.log("repart : " + repart);
    console.log("La repro : " + laRepro);
    console.log("Males P : " + pM);
    console.log("Femelles P : " + pF);
  }
  return (petits = [pM, pF]);
}

function needWaterFood(type) {
  switch (
    type // 0 conso eau / 1 conso carottes // adulte male
  ) {
    case 0:
      besoinConso =
        param[0] *
        (males[1] +
          males[2] * param[2] +
          femelles[1] * param[3] +
          femelles[2] * param[2] * param[3]);
      break;
    case 1:
      besoinConso =
        param[1] *
        (males[1] +
          males[2] * param[2] +
          femelles[1] * param[3] +
          femelles[2] * param[2] * param[3]);
      break;
    default:
      console.log("Erreur");
  }

  return besoinConso;
  /*conso femelle = conso male * param[3]
  conso petit male = conso male * param[2]
  conso petite femelle = conso femelle * param[2]*/
}

function around(number, howMany) {
  return number.toFixed(howMany);
}

function checkQty(type, value) {
  switch (type) {
    case 0: // verif eau
      if (value > varis[0]) {
        return varis[0] - value;
      } else {
        // revoir logique : tester < 0 => calcul reste et morts
        return varis[1] - value;
      }
      break;
    case 1: // verif carottes
      if (value > varis[1]) {
        return varis[1] - value;
      } else {
        // revoir logique : tester < 0 => calcul reste et morts
        return varis[1] - value;
      }
      break;
    default:
      console.log("ERREUR");
  }
}

function printPrice(what, how) {
  let msg = `Le prix ${what} est de ${how} €`;
  return msg;
}

/***********************/
/* Debut d'application */
/***********************/

console.clear();
console.log("**************************************");
console.log("*****                       **********");
console.log("*****       S T A R T       **********");
console.log("*****                       **********");
console.log("*****        G A M E        **********");
console.log("*****                       **********");
console.log("**************************************");
console.clear();

if (debug == 0) {
  state();
}

console.log("Consommation mensuele en eau : " + paramStageEau());
paramStageCarottes(
  "Consommation mensuele en carottes : " + paramStageCarottes()
);

// init nb de vente
var vente = 0;

// Debut du jeu
for (party = 0; party < nbRun; party++) {
  // si 1er tour, pas de vente
  // sinon combien de vente M et F adultes + test surpopulation cages
  if (party > 0) {
    console.log(printPrice("d'un lapin male", males[3].toFixed(2)));
    do {
      vente = readlineSync.question("Combien voulez-vous vendre de males ? ");
    } while (vente > males[1]);

    males[1] -= vente;
    varis[2] += males[3] * vente;

    console.log(printPrice("d'un lapin femelle", femelles[3].toFixed(2)));
    do {
      vente = readlineSync.question(
        "Combien voulez-vous vendre de femelles ? "
      );
    } while (vente > femelles[1]);

    femelles[1] -= vente;
    varis[2] += femelles[3] * vente;

    //===>> nb lapins dans nb cages
    //console.log("Surpopulation : "+surPop(totalCheptel(),males[0]+femelles[0]));
  }
}



//===>> nb lapins dans nb cages
//===>> console.log("Surpopulation : "+surPop(60,2));

// combien d'accouplements

// combien de cages
//===>> decaisser 10
//===>> console.log('En moins : '+ affectCaisse(0,10));  // reste 47

/*
console.log('Tarifs cage :'+calculPrix(param[6]));
console.log('Tarifs Lapin Male :'+calculPrix(males[3]));
console.log('Tarifs Lapin Femelle :'+calculPrix(femelles[3]));
console.log('Tarifs litre d\'eau :'+calculPrix(param[4]));
console.log('Tarifs kilo de carottes :'+calculPrix(param[5]));
*/

// combien de nourriture : index 1
console.log("Besoin conso carottes: ");
console.log(mortalite(1));

// combien d'eau : index 0
//console.log('Mortalité : ');
console.log("Besoin conso eau: ");
console.log(mortalite(0));

// calcul nb lapins nouveau cheptel
if (debug == 1) {
  console.log(
    "Petits males = " + males[2] + " Petites femelles : " + femelles[2]
  );
}
let petits = repro(7);
console.log("Pour accouplement de 3 : " + petits);
males[2] += petits[0];
femelles[2] += petits[1];
console.log(
  "Petits males = " + males[2] + " Petites femelles : " + femelles[2]
);

// on calcule les besoins à partir des consos de male adulte
/*
conso femelle = conso male * param[3]
conso petit male = conso male * param[2]
conso petite femelle = conso femelle * param[2]
*/
// calcul besoin en nourriture
console.log("** Conso du mois **");
console.log("Besoin en eau : " + around(needWaterFood(1), 3) + " litre(s)"); // 0 = eau // 1 = carottes
console.log("Besoin en carottes : " + around(needWaterFood(0), 3) + " kilo(s)"); // 0 = eau // 1 = carottes

// si besoin nourriture suffisant, deduire nourriture necessaire
// sinon affecter 0, calculer et deduire nb morts (moitie M - moitié F / moitie adultes - moitié petits)
// checkQty(type,value);
console.log("eau : " + checkQty(0, 52)); // conso de 52 litres d'eau
console.log("carottes : " + checkQty(1, 25)); // conso de 25 kg de carottes

// si besoin eau suffisant, deduire eau necessaire
// sinon affecter 0, calculer et deduire nb morts (moitie M - moitié F / moitie adultes - moitié petits)

// si adulte M ou F = 0, continuer si M et F dans petits, sinon Game Over

console.log(
  "*********************************************************************"
);
console.log(
  "*********************************************************************"
);
console.log(
  "*********************************************************************"
);
console.log("");

state();
