/* Array
Initial :
cheptel[]={[[0,1],[0,1],[0,0]],[[1,1],[1,1],[1,0]]}
<=> [sexe,adultes,petits]
*/

var males = [1, 1, 0]; // cage male - nb male adulte dans cages - nb male petit dans cages
var femelles = [1, 1, 0]; // cage femelle - nb femelle adulte dans cages - nb femelle petit dans cages
var varis = [20, 30, 50];  // litre d'eau - kilo de nourriture - argent en caisse
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

state();
           
paramStage();