let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
function generateTarget(){
    return Math.floor(Math.random() * 9);
}

function compareGuesses(user,computer,secret){
    let wUser = Math.abs(secret-user);
    let wComputer = Math.abs(secret-computer);
    if(wUser <= wComputer){
        return true;
    }else{
        return false;
    }
}

function updateScore(who){
    switch(who){
        case 'human':
            humanScore++;
            break;
        case 'computer':
            computerScore++;
            break;
        default:
            console.log('ERREUR');
    }
}

function advanceRound(){
    currentRoundNumber++;
}


compareGuesses(3, 6, 9);
/*compareGuesses(4,1,5);
compareGuesses(7,3,6);
compareGuesses(2,2,9);
compareGuesses(8,4,4);
compareGuesses(9,6,9);
compareGuesses(5,5,5);*/


/*console.log(generateTarget());

console.log(compareGuesses(1,2,3));

updateScore('human');
updateScore('human');
updateScore('human');
updateScore('human');
console.log(humanScore);
updateScore('computer');
updateScore('computer');
console.log(computerScore);

advanceRound();
advanceRound();
console.log(currentRoundNumber);
*/
