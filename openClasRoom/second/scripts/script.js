// A noter : ce n'est pas la seule réponse valide pour cet exercice, il en existe d'autres plus optimisées,
// mais nous verrons cela dans les prochains chapitres.

function choisirPhrasesOuMots() {
  // Déclaration de la variable contenant le choix de l'utilisateur
  let choix = prompt(
    "Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?"
  );
  // Tant que l'utilisateur n'a pas saisi "mots" ou "phrases", on lui redemande de saisir un choix
  while (choix !== "mots" && choix !== "phrases") {
    choix = prompt(
      "Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?"
    );
  }
  return choix;
}

function afficherResultat(score, nbMotsProposes) {
  console.log("Votre score est de " + score + " sur " + nbMotsProposes);
}

function lancerBoucleDeJeu(listePropositions) {
    let score = 0
  for (let i = 0; i < listePropositions.length; i++) {
    // On demande à l'utilisateur de saisir le mot correspondant à l'indice i
    let motUtilisateur = prompt("Entrez le mot : " + listePropositions[i]);
    if (motUtilisateur === listeMots[i]) {
      // Si le mot saisi par l'utilisateur est correct, on incrémente le score
      score++;
    }
  }
  return score;
}

function lancerJeu() {
    let choix = choisirPhrasesOuMots()
    let score = 0
    let nbMotsProposes = 0

    if(choix === 'mots'){
        score = lancerBoucleDeJeu(listeMots)
        nbMotsProposes = listeMots.length
    } else {
        if(choix === 'phrases'){
            score = lancerBoucleDeJeu(listePhrases)
            nbMotsProposes = listePhrases.length
        }
    }

    afficherResultat(score, nbMotsProposes)
}