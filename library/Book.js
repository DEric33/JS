class Book extends Media {
  /*
Properties: author (string), title (string), pages (number), isCheckedOut (boolean, initially false), and ratings (array, initially empty).
Getters: all properties have a getter
Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()
*/
  constructor(author, title, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
    // this._isCheckOut = false;
    // this._ratings = [];
  }

  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
}
