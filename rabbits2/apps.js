const { clear } = require("console");
const { stdout, exit } = require("process");
const { clearScreenDown } = require("readline");
var readlineSync = require("readline-sync");

var debug = 0; // 0 = Off   1 = On

/* 
************ RABBITS 2 ******************
Array
Initial :
cheptel[]={[[0,1],[0,1],[0,0]],[[1,1],[1,1],[1,0]]}
<=> [sexe,adultes,petits]
*/

/*
Liste des fonctions
achat               achat eau, carottes... cages   // 0 - 1 - 2
affectCaisse        gestion caisse entree et sortie
around              gestion de la virgule
calculPrix          calcule tarifs eau, carottes, cage
checkDead           repartition du nb de morts sur MA et FA
checkQty            verif assez eau ou assez carottes
mortalite           mortalite pour faim ou soif
needWaterFood       besoin d'apres cheptel en eau ou en carottes
paramStageEau       consommations du mois
paramStageCarottes  consommations du mois
printPrice          affiche prix des choses
repro               reproduction
state               affiche l'etat du moment
surPop              renvoie nb morts suite a surpopulation
*/
var males = [1, 1, 0, 3]; // cage male - nb male adulte dans cages - nb male petit dans cages - tarif base M
var femelles = [1, 1, 0, 4]; // cage femelle - nb femelle adulte dans cages - nb femelle petit dans cages - tarif base F
var varis = [30, 60, 50, 25]; // litre d'eau - kilo de nourriture - argent en caisse - population par cage
var param = [2, 4, 0.6, 0.8, 1, 2, 5, 15, 4, 8]; // conso mois eau adulte male - conso mois carottes adulte male
// - variation conso adulte/petit - variation conso male/femelle
// - tarif base eau - tarif base carotte - tarif base cage - variation tarif +/- en %
// - marge bas reproduction - marge haut reproduction
var paramTmp = [];
var nbRun = 4; //  12 run pour la version FileSystemHandle, soit un an
var verif; // pour tester conditions diverses

// variables du jeu
var vg_vente, vg_accoup, tarif, rabbitsToKill;

function achat(type, qte, tarif) {
  switch (type) {
    case 0:
      // caisse -
      varis[2] -= tarif * qte;
      // eau +
      varis[0] += qte * 1;
      break;
    case 1:
      // caisse -
      varis[2] -= tarif * qte;
      // carottes +
      varis[1] += qte * 1;
      break;
    default:
      console.log("ERREUR");
  }
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

function around(number, howMany) {
  return number.toFixed(howMany);
}

function calculPrix(valBase) {
  let min = valBase * (1 - param[7] / 100);
  let max = valBase * (1 + param[7] / 100);
  //     return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkDead(nbDead){
  let nbAdults = males[1] + femelles[1];
  if (nbDead>=nbAdults){
    males[1]=0;
    femelles[1]=0;
  }else{
    console.log('* * * * * * * * * * * * * * * * * * * * * * * *');
    console.log('nbDead = '+nbDead+' soit pour moitié : '+nbDead/2);
    console.log('* * * * * * * * * * * * * * * * * * * * * * * *');
    males[1]-=nbDead/2;
    femelles[1]-=nbDead/2;
  }
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
      return varis[0] - besoinConso;
      break;
    case 1:
      besoinConso =
        param[1] *
        (males[1] +
          males[2] * param[2] +
          femelles[1] * param[3] +
          femelles[2] * param[2] * param[3]);
          return varis[1] - besoinConso;
      break;
    default:
      console.log("Erreur");
  }

  
  /*conso femelle = conso male * param[3]
  conso petit male = conso male * param[2]
  conso petite femelle = conso femelle * param[2]*/
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

function printPrice(what, how) {
  let msg = `Le prix ${what} est de ${how} €`;
  return msg;
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
    console.log("reparti : " + repart + " %");
    console.log("La repro : " + laRepro);
    console.log("Males P : " + pM);
    console.log("Femelles P : " + pF);
  }
  males[2] += pM;
console.log('Ce qui donne '+males[2]+' petits males');
  femelles[2] += pF;
  console.log('Ce qui donne '+femelles[2]+' petites femelles');
  return (petits = [pM, pF]); // supprimable
}

function state() {
  console.log("*********************************************************");
  console.log("");
  console.log("                   LAPINERIE ONLINE");
  console.log("");
  console.log("*********************************************************");
  console.log("");
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
  console.log("");
  console.log("*********************************************************");
  console.log("");
  console.log("L'occupation moyenne est donc de : ");
  console.log(
    around((males[1] + males[2]) / males[0], 0) +
      " male(s) par cage et " +
      around((femelles[1] + femelles[2]) / femelles[0], 0) +
      " femelle(s) par cage"
  );
  console.log("");
  console.log("*********************************************************");
  console.log("");
  console.log("                      FOURNITURES");
  console.log(
    "Vous disposez de " +
      varis[0] +
      " litre(s) d'eau ainsi que " +
      varis[1] +
      " kilo(s) de nourriture"
  );
  console.log("Et votre fond de caisse se monte à " + varis[2] + " euros");
}

/* Mortalité par surpopulation */
function surPop(nLapins, nCage) {
  let reste = varis[3] * nCage - nLapins;
  if (reste < 0) {
    // 1/2 M - 1/2 F déduits
    males[1] -= Math.abs(reste / 2);
    if (males[1] < 0) {
      males[1] = 0;
    }
    femelles[1] -= Math.abs(reste / 2);
    if (femelles[1] < 0) {
      femelles[1] = 0;
    }
    return Math.abs(reste);
  } else return 0;
}

function totalCheptel() {
  if (debug == 1) {
    return 75;
  } else {
    return males[1] + males[2] + femelles[1] + femelles[2];
  }
}

function reInitVarGame() {
  // line 41
  vg_vente = 0;
  vg_accoup = 0;
}

function aere() {
  console.log("");
  console.log("*********                       **********");
  console.log("");
}

/***********************/
/* Debut d'application */
/***********************/

/*
* Déroulement
- Vente males et femelles
- Achat cages males et femelles
- Reproduction
- Achat eau
- Achat carottes
-
- Verif surpopulation
- Verif suffisament d'alimentation et d'eau
 */

console.clear();
console.log("**************************************");
console.log("*****                       **********");
console.log("*****       S T A R T       **********");
console.log("*****                       **********");
console.log("*****        G A M E        **********");
console.log("*****                       **********");
console.log("**************************************");

if (debug == 3) {
  state();
}

console.log("FOR INFORMATION");
console.log("Consommation mensuelle en eau : " + paramStageEau());
console.log("Consommation mensuelle en carottes : " + paramStageCarottes());
console.log("");

// Debut du jeu
for (party = 0; party < nbRun; party++) {
  //console.clear();

  console.log("Mois N° " + (party + 1));

  reInitVarGame();

  state();

  aere();

  // transfert petits dans cages adultes
  males[1] += males[2];
  femelles[1] += femelles[2];
  // si 1er tour, pas de vente
  // sinon combien de vente M et F adultes + test surpopulation cages
  if (party > 0) {
    console.log(printPrice("d'un lapin male", males[3].toFixed(2)));
    do {
      vg_vente = readlineSync.question(
        "Combien voulez-vous vendre de males ? "
      );
    } while (vg_vente > males[1] || vg_vente=='');

    males[1] -= vg_vente;
    varis[2] += males[3] * vg_vente;

    console.log(printPrice("d'un lapin femelle", femelles[3].toFixed(2)));
    do {
      vg_vente = readlineSync.question(
        "Combien voulez-vous vendre de femelles ? "
      );
    } while (vg_vente > femelles[1] || vg_vente=='');

    femelles[1] -= vg_vente;
    varis[2] += femelles[3] * vg_vente;

    aere();

    //===>> nb lapins dans nb cages
    //console.log("Surpopulation : "+surPop(totalCheptel(),males[0]+femelles[0]));
  }

  // *** ACHAT CAGES ***
  console.log(printPrice("des cages", param[6].toFixed(2)));
  do {
    
    cm_achat = readlineSync.question(
      "Combien voulez-vous acheter de cages pour les males ? "
    );
  } while ((cm_achat < 0) || (param[6] * cm_achat > varis[2]));
  if(!isNaN(cm_achat)){cm_achat=0;}

  males[0] += parseInt(cm_achat);
  console.log(males[0] + "      * * * * * * * * * YES * * * * * * * * *");
  varis[2] -= param[6] * cm_achat;

  do {
    cf_achat = 0;
    cf_achat = readlineSync.question(
      "Combien voulez-vous acheter de cages pour les femelles ? "
    );
  } while ((cf_achat < 0) || (param[6] * cf_achat > varis[2]) || isNaN(cf_achat));
  if(!isNaN(cf_achat)){cf_achat=0;}

  femelles[0] += parseInt(cf_achat);
  console.log(femelles[0] + "      * * * * * * * * * YES * * * * * * * * *");
  varis[2] -= param[6] * cf_achat;

  // *** REPRODUCTION ***
  console.log("**** Accouplement ****");
  if (debug == 1) {
    console.log(males[1] + " males et " + femelles[1] + " femelles");
  }
  do {
    vg_accoup=0;
    vg_accoup = readlineSync.question(
      "Combien voulez-vous effectuer d'accouplements ? "
    );
  } while ((vg_accoup > males[1]) || (vg_accoup > femelles[1]));

  console.log(repro(vg_accoup));



  aere();

  // **** Achat eau ****
  tarif = calculPrix(param[4]);
  console.log(printPrice("du litre d'eau", tarif));
  do {
    eau_achat = readlineSync.question(
      "Combien voulez-vous acheter de litres d'eau ? "
    );
  } while (eau_achat * tarif > varis[2] || eau_achat=='');

  achat(0, eau_achat, tarif);

  aere();

  // **** Achat carottes ****
  tarif = calculPrix(param[5]);
  console.log(printPrice("d'un kilo de carottes", tarif));
  do {
    carotte_achat = readlineSync.question(
      "Combien voulez-vous acheter de kilos de carottes ? "
    );
  } while (carotte_achat * tarif > varis[2] || carotte_achat=='');

  achat(1, carotte_achat, tarif);

  aere();

  // **** VERIF SURPOPULATION ****
  // si totalCheptel / nbCages > 25  => true

  verif = surPop(
    males[1] + males[2] + femelles[1] + femelles[2],
    males[0] + femelles[0]
  );

  if (verif > 0) {
    console.log(
      verif + " pauvres lapins sont morts étouffés. Pensez à acheter des cages."
    );
  }

  aere();

  // ****  VERIF CONSO OK  ****
  // ****    EAU OK ???    ****
  console.clear();
  console.log(
    "- Morts de soif : " + needWaterFood(0)
  );
  verif = needWaterFood(0);
  if (verif < 0) {
    console.log(
      Math.abs(around(verif,0)) + " pauvres lapins sont morts de soif. Pensez à acheter de l'eau."
      );
      varis[0]=0;
    // combien manque-t-il d'eau ? Deduire lapins morts . Meme rapport M/F que pour surpop
    // nb lapins calculés sur la base du coeficient conso male * conso femelle * conso petits * qte
    rabbitsToKill = Math.abs(verif)*param[0]*param[2]*param[3];
    checkDead(rabbitsToKill);
    console.log("*Rabbits to kill *****************>>>>> "+rabbitsToKill);
  }
  // **** CAROTTES OK ???? ****
  console.log(
    "- Morts de faim : " + Math.abs(needWaterFood(1))
  );
  verif = needWaterFood(1);
  if (verif < 0) {
    console.log(
      Math.abs(around(verif,0)) +
        " pauvres lapins sont morts de faim. Pensez à acheter des carottes."
    );
    // combien manque-t-il de carottes ? Deduire lapins morts . Meme rapport M/F que pour surpop
    rabbitsToKill = Math.abs(verif)*param[1]*param[2]*param[3];
    checkDead(rabbitsToKill);
    console.log("*Rabbits to kill *****************>>>>> "+rabbitsToKill);
  }
}

aere();
aere();
aere();
aere();





/*
EN COURS (-) / RESOLU (+) :
- Pas de validation sur achat de caisse: si return sec, enregistre NaN  + 221028
- Pas de validation sur accouplement: si return sec, enregistre 0       + 221028
- continue meme avec 0 adulte et 0 petit : il faut un GameOver !
- Accouplement ne fonctionne plus
*/






aere();

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
