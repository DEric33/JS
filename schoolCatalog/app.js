class School {
    constructor(name,level,numberOfStudents) {
        this._name = name;
        this._level = level;
        this._numberOfStudents = numberOfStudents;
    }

    get name() {
        return this._name;
    }
    get level() {
        return this._level;
    }
    get numberOfStudents() {
        return this._numberOfStudents;
    }

    quickFacts(name,numberOfStudents,level) {
        console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this._level} school level.`);
    }

    pickSubstituteTeacher(substituteTeachers) {
        let random = Math.random(substituteTeachers.length);
    }


    set numberOfStudents(count) {
        if (typeof count !== 'Number') {
            console.log('Invalid input: numberOfStudents must be set to a Number.');
          } else {
            console.log('__');
          }
        }
  
}

class PrimarySchool extends School {
    constructor(name,level,numberOfStudents){
        super(name);
        this._level = 'primary';
        this._numberOfStudents = numberOfStudents;
        
      //  this._pickupPolicy = pickupPolicy;
    }

    get pickupPolicy() {
        return this._pickupPolicy;
    }

}

class HighSchool extends School {
    constructor(name,numberOfStudents,sportsTeams){
        super(name);
       // this._high = high;
        this._sportsTeams = sportsTeams;
    }
    get sportsTeams() {
        return this._sportsTeams;
    }

}

const lorraineHansbury = new PrimarySchool('Lorraine Hansbury',514,'Students must be picked up by a parent, guardian, or a family member over the age of 13.');
lorraineHansbury.quickFacts();

lorraineHansbury.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']);

//console.log(lorraineHansbury);

const alSmith = new HighSchool('Al E. Smith',415,['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);