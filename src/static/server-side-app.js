'use strict';

let btClear = document.getElementById("bt-clear");
let btMix = document.getElementById("bt-mix");
let btSend = document.getElementById("bt-send");
let btNew = document.getElementById("bt-new");
let field = document.getElementById("field");
let selectedLetters = document.getElementById("selected-letters");
let dynamicString = "";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

class Game {

    constructor() {
        this._size = 12;
        this._selectedPoints = [];
        this.matrix = (new Array(this._size)).fill([])
    }

    get countRows() {
        return this._countRows;
    }

    get countColumns() {
        return this._countColumns;
    }

    get selectedPoints() {
        return this._selectedPoints;
    }

    set selectedPoints(value) {
        this._selectedPoints = value;
    }

    setMatrix(arr) {
        if (arr[0].length != 0) {
            for (var i = 0; i < this._size; i++)
                this.matrix[i] = arr[i].slice();

            console.log(this.matrix);
        }
    }
}
