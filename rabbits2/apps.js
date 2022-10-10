/* Array
Initial :
cheptel[]={[[0,1],[0,1],[0,0]],[[1,1],[1,1],[1,0]]}
<=> [sexe,adultes,petits]
*/
var cheptel = new Array();
cheptel[0,0] = 1; // cage male
cheptel[0,1] = 1; // nb male adulte/cage
cheptel[0,2] = 0; // nb male petit/cage
cheptel[1,0] = 1; // cage femelle
cheptel[1,1] = 1; // nb femelle adulte/cage
cheptel[1,2] = 0; // nb femelle petit/cage
cheptel[2,0] = 20; // litre d'eau
cheptel[2,1] = 30; // kilo de nourriture
cheptel[2,2] = 50; // argent en caisse

class Lapin {
    constructor(){

    }

    reproduct() {

    }

}

class Sex extends Lapin {
    constructor(sex){
        super();
        this.sex = sex;
    }

}

class BigSmall extends Sex {
    constructor(bigSmall){
        super(sex);
    }
    

}

console.log(cheptel);
console.log(cheptel[1,1]);

                