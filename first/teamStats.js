const team = {
    _players:[
      {firstName:'John',lastName:'Do',age:37},
      {firstName:'Theresa',lastName:'Iglesias',age:48},
      {firstName:'Betty',lastName:'Boop',age:26}
    ],
    get players(){
      return this._players;
    },
    _games:[
      {opponent:'Jets', teamPoints:42, opponentPoints:27},
      {opponent:'Giants', teamPoints:45, opponentPoints:12},
      {opponent:'Eagles', teamPoints:31, opponentPoints:15},
    ],
    get games(){
      return this._games;
    },
    addPlayer(newFirstName,newLastName,newAge){
        let player= {
            firstName : newFirstName,
            lastName : newLastName,
            age : newAge
        }
        this.players.push(player);
      
      },
      addGame(newOpponent,newTeamPoints,newOpponentPoints){
        let game = {
            opponent : newOpponent,
            teamPoints : newTeamPoints,
            opponentPoints : newOpponentPoints
        }
        this.games.push(game);
      }
      };
      team.addPlayer('Bugs','Bunny',76);
      team.addGame('Titans',100,98);
      console.log(team.players);
      console.log(team.games);