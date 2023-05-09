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