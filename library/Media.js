class Media {
    constructor(title) {
        this._title = title;
        this._isCheckedOut = false;
        this._ratings = [] ;
    }

    get title() {
        return this._title;
    }
    
    get isCheckedOut() {
        return this._isCheckedOut;
    }
    
    get ratings() {
        return this._ratings;
    }

    toggleCheckOutStatus(isCheckedOut) {
        this.isCheckOut = !this._isCheckOut;
    }

    getAverageRating() {
        let ratingsSum = this.ratings.reduce((accumulator, rating) => accumulator + rating);
        return ratingsSum / this.ratings.length;
    }

    addRating(value) {
        this.ratings.push(value);
    }

    set isCheckedOut(value) {
        this._isCheckedOut = value;
    }

}

const historyOfEverything = new Book('Bill Bryson','A Short History of Nearly Everything',544);
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);

