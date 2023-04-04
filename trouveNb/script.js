let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
const generateTarget = nb => {
	return Math.floor(Math.random()*10);
	//console.log(Math.floor(Math.random()*10));
}

const compareGuesses = (human, computer, guess) => {
	let humanGuess = Math.abs(human-guess);
	let computerGuess = Math.abs(computer-guess);
	if(humanGuess<computerGuess){
	//human win	
		return true;		
	} else if (humanGuess>computerGuess) {
		return false;
	} else {
	//human win	
		return true;
	}
}

const updateScore = whoWin => {
	if(whoWin==='computer'){
		computerScore=computerScore+1;
		return computerScore;
	}else if(whoWin==='human'){	
		humanScore=humanScore+1;	
		return humanScore;
	} else {
		consoleLog('ERROR');
	}
}

const advanceRound = currentRoundNumber => {
	return currentRoundNumber=currentRoundNumber+1;
}

//console.log(advanceRound(4));
//console.log(generateTarget());
//console.log(updateScore('computer'));
//console.log(updateScore('human'));