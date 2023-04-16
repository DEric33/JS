// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (nbr, array) => {
  function mutate(){
    return returnRandBase();
  }
  return array;
};

// sélectionne aléatoirement une base et renvoie la base ('A','T','C' ou 'G')
///console.log(returnRandBase());

// générer un tableau contenant 15 bases
///console.log(mockUpStrand());
const array = [7, 8, 9, 4];

console.log(pAequorFactory(2, array));
