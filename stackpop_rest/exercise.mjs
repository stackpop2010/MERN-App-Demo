import { uid } from 'uid';

export default class Exercise {
    /**
     * 
     * @param {string} name
     * @param {Number} reps
     * @param {Number} weight
     * @param {String} unit
     * @param {String} date
     */
    constructor(name, reps, weight, unit, date) {
        this.name = name;
        this.reps = reps;
        this.weight = weight;
        this.unit = unit;
        this.date = date;
        this._id = uid(24);
    }
}