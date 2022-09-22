class Movie extends Media {
  /*
properties: director (string), title (string), runTime (number), isCheckedOut (boolean, initially false), and ratings (array, initially empty)
getters: all properties have a getter
methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()
*/
  constructor(director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
    //    this._isCheckedOut = false;
    //   this._ratings = [];
  }

  get director() {
    return this._director;
  }

  get runTime() {
    return this._runTime;
  }
}
