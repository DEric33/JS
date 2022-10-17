function whatRelation(percentSharedDNA){
    if(percentSharedDNA<100){
        if(percentSharedDNA<35){
            if(percentSharedDNA<14){
                if(percentSharedDNA<6){
                    if(percentSharedDNA<3){
                        if(percentSharedDNA<1){
                            return 'You are likely not related.'
                        }else{
                            return 'You are likely 3rd cousins.'
                        }
                    }else{
                        return 'You are likely 2nd cousins.'
                    }
                }else{
                    return 'You are likely 1st cousins.'
                 }
            }else{
                return 'You are likely grandparent and grandchild, aunt/uncle and niece/nephew, or half siblings.'
            }
        }else{
            return 'You are likely parent and child or full siblings.'
        }
    }else{
        return 'You are likely identical twins.';
    }
}

//console.log(whatRelation(34));
console.log(whatRelation(3));

/*
Étant donné le pourcentage d'ADN partagé entre deux personnes, vous pouvez calculer leur relation familiale probable.

Nous avons écrit une fonction, whatRelation(), qui a un paramètre numérique, percentSharedDNA, et renvoie la relation probable. Nous nous attendons à ce que le nombre transmis soit toujours un nombre entier de 0 à 100, mais pour une raison quelconque, cela ne fonctionne pas !

Voici comment il est censé calculer la relation :

100 devrait renvoyer 'Vous êtes probablement des jumeaux identiques.'
35-99 devrait renvoyer 'Vous êtes probablement parent et enfant ou frères et sœurs à part entière.'
14-34 devrait retourner 'Vous êtes probablement grand-parent et petit-enfant, tante/oncle et nièce/neveu, ou demi-frères et sœurs.'
6-13 devrait renvoyer 'Vous êtes probablement des cousins ​​germains.'
3-5 devrait renvoyer 'Vous êtes probablement cousins ​​germains.'
1-2 devrait renvoyer 'Vous êtes probablement cousins ​​germains.'
0 devrait renvoyer 'Vous n'êtes probablement pas apparenté.'
Malheureusement, cela ne fonctionne pas comme nous le souhaitons !

quelleRelation(34)
// Devrait retourner 'Vous êtes probablement grand-parent et petit-enfant, tante/oncle et nièce/neveu, ou demi-frères et sœurs.'
// Mais à la place, il renvoie 'Vous êtes probablement des cousins ​​germains.'
 
quelleRelation(3)
// Devrait renvoyer 'Vous êtes probablement des cousins ​​germains.'
// Mais à la place, il retourne 'Vous êtes probablement grand-parent et petit-enfant, tante/oncle et nièce/neveu, ou demi-frères et sœurs.'
Pouvez-vous corriger notre code, s'il vous plaît ?
*/