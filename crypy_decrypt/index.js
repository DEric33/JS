class ShiftCipher {
    constructor(shift){
      this.shift = shift;
    }
    encrypt(plainString) {
      let encryptString = '';
      const tempString = plainString.toUpperCase();
  
      for (let i=0; i < tempString.length; i++) {
        let charNum = tempString.charCodeAt(i);
        
        if (charNum <= 90 && charNum >= 65) {
          charNum += this.shift;
          if (charNum > 90) {
            charNum -= 26;
          }
        }
        encryptString += String.fromCharCode(charNum);
      }
      return encryptString;
    }
  
    decrypt(encryptString) {
      let decryptString = '';
      const tempString = encryptString.toLowerCase();
  
      for (let i=0; i < tempString.length; i++) {
        let charNum = tempString.charCodeAt(i);
        
        if (charNum <= 122 && charNum >= 97) {
          charNum -= this.shift;
          if (charNum < 97) {
            charNum += 26;
          }
        }
        decryptString += String.fromCharCode(charNum);
      }
      return decryptString;
    }
  }

  const cipher = new ShiftCipher(2);
console.log(cipher.encrypt('I love to code!')); // returns 'K NQXG VQ EQFG!'
console.log(cipher.decrypt('K <3 OA RWRRA')); // returns 'i <3 my puppy'

/*
Un chiffrement par décalage prend un message en texte brut et décale chaque lettre vers l'avant dans l'alphabet d'un nombre donné. Par exemple, un chiffrement par décalage avec un décalage de 1 transformerait la chaîne 'hello' en 'ifmmp'.

Créez une classe ShiftCipher qui prend la valeur numérique du décalage comme paramètre de constructeur. La classe doit avoir deux méthodes :

chiffrer : prend une chaîne de texte brut et renvoie une chaîne en majuscule avec chaque lettre décalée vers l'avant dans l'alphabet en fonction de la valeur de décalage définie.
déchiffrer : prend un message chiffré et renvoie une chaîne en minuscules avec chaque lettre décalée dans l'alphabet en fonction de la valeur de décalage définie.
Dans les deux méthodes, tout caractère en dehors de l'alphabet doit rester le même.
Mais si un caractère est décalé en dehors de l'alphabet dans l'une ou l'autre direction, il doit être enroulé de l'autre côté. Par exemple, chiffrer un y avec un décalage de 4 donne C et déchiffrer un A avec un décalage de 1 donne z.
Exemple:

chiffrement const = new ShiftCipher(2);
cipher.encrypt('J'adore coder !'); // renvoie 'K NQXG VQ EQFG!'
cipher.decrypt('K <3 OA RWRRA'); // renvoie 'i <3 mon chiot'
N'hésitez pas à référencer la table Unicode ainsi que les méthodes de chaîne JavaScript, notamment : toUpperCase(), toLowerCase(), charCodeAt() et fromCharCode()
*/