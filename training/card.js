/* All valid credit card numbers*/
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:




/*
Context: The company that you work for suspects that credit card distributors have 
been mailing out cards that have invalid numbers. In this project, you have the 
role of a clerk who checks if credit cards are valid. Every other clerk currently 
checks using pencil and paper, but you’ll be optimizing the verification process 
using your knowledge of functions and loops to handle multiple credit cards at a 
time. Unlike the other clerks, you can spend the rest of your time relaxing!

As you progress through the steps, use the terminal and console.log() statements 
to check the output of your loops and functions.



Contexte : L'entreprise pour laquelle vous travaillez soupçonne que les distributeurs 
de cartes de crédit ont envoyé par la poste des cartes dont les numéros ne sont pas 
valides. Dans ce projet, vous avez le rôle d'un préposé qui vérifie si les cartes de 
crédit sont valides. Tous les autres commis actuellement vérifie avec un crayon et 
du papier, mais vous optimiserez le processus de vérification utiliser vos connaissances 
des fonctions et des boucles pour gérer plusieurs cartes de crédit à la fois. 
Contrairement aux autres commis, vous pouvez passer le reste de votre temps à vous détendre !

Au fur et à mesure que vous progressez dans les étapes, utilisez les instructions 
terminal et console.log() pour vérifier la sortie de vos boucles et fonctions.


2. Regardez le code de démarrage. Il existe 15 tableaux contenant chacun les chiffres 
de numéros de carte de crédit distincts. Ils ont tous des préfixes pour refléter leur statut, 
c'est-à-dire que les variables qui commencent par valid contiennent un nombre valide, 
alors que invalid n'en a pas, et les variables mystères peuvent être l'un ou l'autre. 
Il existe également un tableau par lots qui stocke toutes les cartes de crédit fournies 
dans un seul tableau.

Vous utiliserez ces tableaux plus tard pour vérifier si vos fonctions fonctionnent correctement.

3. Créez une fonction, validateCred() qui a un paramètre d'un tableau. Le but de validateCred() 
est de retourner true lorsqu'un tableau contient les chiffres d'un numéro de carte de crédit 
valide et false lorsqu'il est invalide. Cette fonction ne doit PAS modifier les valeurs du 
tableau d'origine.

Pour savoir si un numéro de carte de crédit est valide ou non, utilisez l'algorithme de Luhn. 
De manière générale, un algorithme est une série d'étapes qui résolvent un problème 
- l'algorithme de Luhn est une série de calculs mathématiques utilisés pour valider certains 
numéros d'identification, par ex. numéros de carte de crédit. Les calculs de l'algorithme de 
Luhn peuvent être décomposés comme suit :

En partant du chiffre le plus éloigné vers la droite, AKA le chiffre de contrôle, itérer vers la gauche.
Lorsque vous parcourez vers la gauche, un chiffre sur deux est doublé (le chiffre de contrôle n'est pas doublé). 
Si le nombre est supérieur à 9 après avoir doublé, soustrayez 9 de sa valeur.
Additionnez tous les chiffres du numéro de carte de crédit.
Si la somme modulo 10 est 0 (si la somme divisée par 10 a un reste de 0) alors le nombre est valide, sinon, 
il est invalide.
Voici un visuel qui décrit les étapes. Vérifiez votre fonction en utilisant les numéros valides et non valides fournis.


Bloqué? Avoir un indice
4.
Créez une autre fonction, findInvalidCards() qui a un paramètre pour un tableau imbriqué de numéros de carte de crédit. Le rôle de findInvalidCards() est de vérifier dans le tableau imbriqué pour quels nombres sont invalides et de renvoyer un autre tableau imbriqué de cartes invalides.


Bloqué? Avoir un indice
5.
Après avoir trouvé tous les numéros de cartes de crédit invalides, il est également nécessaire d'identifier les sociétés de cartes de crédit qui ont éventuellement émis ces numéros défectueux. Créez une fonction, idInvalidCardCompanies() qui a un paramètre pour un tableau imbriqué de nombres invalides et renvoie un tableau d'entreprises.

Actuellement, il y a 4 entreprises acceptées qui ont chacune des premiers chiffres uniques. Le tableau suivant montre quel chiffre est unique à quelle entreprise :

Société du premier chiffre
3 Amex (American Express)
4 visas
5 Mastercard
6 Découvrir
Si le numéro ne commence par aucun des numéros répertoriés, imprimez un message du type : « Entreprise introuvable ».

idInvalidCardCompanies() doit renvoyer un tableau d'entreprises qui ont envoyé des cartes avec des numéros invalides. Ce tableau ne doit PAS contenir de doublons, c'est-à-dire que même s'il y a deux cartes Visa invalides, "Visa" ne doit apparaître qu'une seule fois dans le tableau.


Bloqué? Avoir un indice
Extensions de projet et solution
6.
Bon travail! Visitez nos forums pour comparer votre projet à notre exemple de code de solution. Vous pouvez également apprendre à héberger votre propre solution sur GitHub afin de pouvoir la partager avec d'autres apprenants ! Votre solution peut sembler différente de la nôtre, et ce n'est pas grave ! Il existe plusieurs façons de résoudre ces projets, et vous en apprendrez plus en voyant le code des autres.

sept.
Si vous souhaitez vous mettre davantage au défi, vous pouvez envisager ce qui suit :

Utilisez différents numéros de carte de crédit à partir d'un site générateur et validateur de numéros de carte de crédit et testez si vos fonctions fonctionnent pour tous les types de cartes de crédit.
Pour faciliter le test des numéros de carte de crédit, créez une fonction qui accepte une chaîne et la convertit en un tableau de nombres comme les tableaux initialement fournis. (Consultez l'indice pour une fonction utile)
Créez une fonction qui convertira les nombres invalides en nombres valides.



*/







