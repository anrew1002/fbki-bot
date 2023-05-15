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

        this._countRows = 12;
        this._countColumns = 12;

        this._matrixLetter = this.createMatrix();
        this._selectedPoints = new Array();
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
        return this._selectedPoints = value;
    }

    createMatrix() {

        this._matrixLetter = new Object();

        for (let i = 0; i < this._countRows; i++) {
            this._matrixLetter[i] = new Array();
            for (let j = 0; j < this._countColumns; j++) {
                let letterTemp = getRandomInt(65, 90);
                this._matrixLetter[i][j] = String.fromCharCode(letterTemp);
            }
        }

        return this._matrixLetter;
    }

    get matrix() {
        return this._matrixLetter;
    }

    shuffleRow() {
        for (let i = this.countRows - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this._matrixLetter[i], this._matrixLetter[j]] = [this._matrixLetter[j], this._matrixLetter[i]];
        }
    }

    transposing() {
        var newArray = [];
        for (var i = 0; i < this.countRows; i++) {
            newArray.push([]);
        }

        for (var i = 0; i < this.countRows; i++) {
            for (var j = 0; j < this.countRows; j++) {
                newArray[j].push(this._matrixLetter[i][j]);
            }
        }
        this._matrixLetter = newArray;
    }
}
