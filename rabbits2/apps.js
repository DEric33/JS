/* Array
Initial :
cheptel[]={[[0,1],[0,1],[0,0]],[[1,1],[1,1],[1,0]]}
<=> [sexe,adultes,petits]
*/

var males = [1, 1, 0]; // cage male - nb male adulte dans cages - nb male petit dans cages
var femelles = [1, 1, 0]; // cage femelle - nb femelle adulte dans cages - nb femelle petit dans cages
var varis = [30, 60, 50, 25];  // litre d'eau - kilo de nourriture - argent en caisse - population par cage
var param = [20, 15, .6, .8, 1, 2, 15]; // conso mois eau adulte male - conso mois carottes adulte male 
                                        // - variation conso adulte/petit - variation conso male/femelle 
                                        // - tarif base eau - tarif base carotte - variation tarif +/- en %
var paramTmp = [];

function state() {
    console.log("                   LAPINERIE ONLINE");
    console.log('*********************************************************');
    console.log('Votre lapinerie dispose de : ');
    console.log(males[0] +' cage(s) pour les males et '+femelles[0]+' cage(s) pour les femelles');
    console.log('Les cages sont actuellement occupées par ');
    console.log(males[1] +' male(s) adulte(s) et '+males[2]+' petit(s) d\'une part ');
    console.log('et '+femelles[1]+' femelle(s) adulte(s) et '+femelles[2]+' petite(s) d\'autre part');
    console.log('*********************************************************');
    console.log('L\'occupation est donc de : ');
    console.log((males[1]+males[2])/males[0]+' male(s) par cage et '+(femelles[1]+femelles[2])/femelles[0]+' femelle(s) par cage');
    console.log('*********************************************************');
    console.log('                      FOURNITURES');
    console.log('Vous disposez de '+varis[0]+' litre(s) d\eau ainsi que '+varis[1]+' kilo(s) de nourriture');
    console.log('Et votre fond de caisse se monte à '+varis[2]+' euros');
 }

function paramStage() {
    let consoEauMale = param[0];
    let consoEauFemelle = param[0] * param[3];  
    let consoEauPMale = param[0] * param[2];
    let consoEauPFemelle = param[0] * param[3]* param[2];
    let consoFoodMale = param[1];
    let consoFoodFemelle = param[1] * param[3];  
    let consoFoodPMale = param[1] * param[2];
    let consoFoodPFemelle = param[1] * param[3]* param[2];

    let eauMois = consoEauMale + consoEauFemelle + consoEauPMale + consoEauPFemelle;
    let foodMois = consoFoodMale + consoFoodFemelle + consoFoodPMale + consoFoodPFemelle;
    console.log('Conso du mois');
    console.log('Eau : '+ eauMois);
    console.log('Food : '+ foodMois);
}

function surPop(nLapins,nCage) {
    let nbMorts = (varis[3] * nCage) - nLapins;
    // si nb morts > nb adultes => 2/3 - 1/3 deduire adultes - petits
    // regle applicable sans condition d'exactitude proportionnelle : flou du resultat accepté
    if(nbMorts > males[1]+femelles[1]) {
        males[1] = males[1] / 3;
        males[2] = males[2] / 3 * 2;
        femelles[1] = femelles[1] / 3;
        femelles[2] = femelles[2] / 3 * 2; 
    }
    return nbMorts;
}

// mortalité par faim ou par soif
function mortalite(type) {
    let besoinConso;
    // nb lapins adultes M/F * conso + petits lapins M/F * conso  <<== Necessaire
    /*let besoinConso = males[1] * param[0] + males[2] * param[0] * param[2] +  
                      femelles[1] * param[0] * param[3] + femelles[2] * param[0] * param[2] * param[3];  */
    // factorisation
    switch (type) {
     case 0:
        besoinConso = param[0] * (males[1] + males[2] * param[2] + femelles[1] * param[3] + femelles[2] * param[2] * param[3]);
        break;
    case 1:
        besoinConso = param[1] * (males[1] + males[2] * param[2] + femelles[1] * param[3] + femelles[2] * param[2] * param[3]);
        break;
    default:
        console.log('Erreur');
    }
   // let besoinConso = param[0] * (males[1] + males[2] * param[2] + femelles[1] * param[3] + femelles[2] * param[2] * param[3]);
    //let besoinConso = 60;
    // restant virtuel
    let virtuRest =  varis[0] - besoinConso; 
    // si restant virtuel <= 0 , kg carottes = 0 , calcul kg manquants , deduire mortalité sur adultes (2/5 M, 3/5 F)
    if(virtuRest<=0){
        varis[0]=0;
        let potMorts = Math.abs(virtuRest) / param[0];

        console.log('Debug');
        console.log('PotMorts = '+potMorts.toFixed(0));
        console.log('');
        males[1] -= potMorts.toFixed(0) * 2 / 5;
        femelles[1] -= potMorts.toFixed(0) * 3 / 5;
    }

    // return morts
    return Math.abs(virtuRest);
}



state();
           
paramStage();

// Debut du jeu

// si 1er tour, pas de vente
// sinon combien de vente M et F adultes + test surpopulation cages
/////console.log(surPop(4,2));

// combien d'accouplements

// combien de cages

// combien de nourriture : index 1
console.log('Besoin conso carottes: ');
console.log(mortalite(1));

// combien d'eau : index 0
//console.log('Mortalité : ');
console.log('Besoin conso eau: ');
console.log(mortalite(0));

// calcul nb lapins nouveau cheptel

// calcul besoin en nourriture

// calcul besoin en eau

// si besoin nourriture suffisant, deduire nourriture necessaire
// sinon affecter 0, calculer et deduire nb morts (moitie M - moitié F / moitie adultes - moitié petits)

// si besoin eau suffisant, deduire eau necessaire
// sinon affecter 0, calculer et deduire nb morts (moitie M - moitié F / moitie adultes - moitié petits)

// si adulte M ou F = 0, continuer si M et F dans petits, sinon Game Over

console.log('*********************************************************************');
console.log('*********************************************************************');
console.log('*********************************************************************');
console.log('');
state();