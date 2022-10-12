/* Array
Initial :
cheptel[]={[[0,1],[0,1],[0,0]],[[1,1],[1,1],[1,0]]}
<=> [sexe,adultes,petits]
*/

var males = [1, 1, 0]; // cage male - nb male adulte dans cages - nb male petit dans cages
var femelles = [1, 1, 0]; // cage femelle - nb femelle adulte dans cages - nb femelle petit dans cages
var varis = [20, 30, 50, 25];  // litre d'eau - kilo de nourriture - argent en caisse - population par cage
var param = [1, 1, .6, .8, 1, 2, 15]; // conso mois eau adulte male - conso mois carottes adulte male 
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
    let nbMorts = nLapins - (varis[3] * nCage);
    // si nb morts > nb adultes => 2/3 - 1/3 deduire adultes - petits
    // regle applicable sans condition d'exactitude proportionnelle : flou du resultat accepté
    
    return nbMorts;
}

state();
           
paramStage();

// Debut du jeu

// si 1er tour, pas de vente
// sinon combien de vente M et F adultes + test surpopulation cages
console.log(surPop(68,2));

// combien d'accouplements

// combien de cages

// combien de nourriture

// combien d'eau

// calcul nb lapins nouveau cheptel

// calcul besoin en nourriture

// calcul besoin en eau

// si besoin nourriture suffisant, deduire nourriture necessaire
// sinon affecter 0, calculer et deduire nb morts (moitie M - moitié F / moitie adultes - moitié petits)

// si besoin eau suffisant, deduire eau necessaire
// sinon affecter 0, calculer et deduire nb morts (moitie M - moitié F / moitie adultes - moitié petits)

// si adulte M ou F = 0, continuer si M et F dans petits, sinon Game Over
