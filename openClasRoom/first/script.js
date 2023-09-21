let choice = "0";
let score = 0;
let listeMots = ["Cachalot", "Pétunia", "Serviette"];
let listePhrases = [
  "Pas de panique !",
  "La vie, l’univers et le reste",
  "Merci pour le poisson",
];

while (choice !== "1" && choice !== "2") {
  choice = prompt("1. Mots - 2. Phrases");

  if (choice === "1") {
    for (i = 0; i < 3; i++) {
      let numero = i + 1;
      let userWord = prompt("Entrez le mot : " + numero);

      if (userWord == listeMots[i]) {
        score += 1;
      }
    }
  } else if (choice === "2") {
    for (i = 0; i < 3; i++) {
        let numero = i + 1;
        let userSentence = prompt("Entrez la phrase : " + numero);
  
        if (userSentence == listePhrases[i]) {
          score += 1;
        }
      } 

  } else {
    console.log("Choix indisponible")
  }
}

console.log("Score : ", score);
