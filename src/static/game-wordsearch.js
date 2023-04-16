'use strict';

let btClear = document.getElementById("bt-clear");
let btMix = document.getElementById("bt-mix");
let btNew = document.getElementById("bt-new");
let field = document.getElementById("field");
let selectedLetters = document.getElementById("selected-letters");
let dynamicString = "";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getIndex(y, x){
    return y * game.countRows + x;
};

function getPoints(idx){
    let x;
    let y;
    if (idx == 0){
        x = 0;
        y = 0;
    }
    else{
        x = Math.floor(idx / game.countRows);
        y = Math.floor(idx % game.countRows);
    }
    return [x, y];
};

function generateArray(size) {
    return Array.from(Array(size).keys());
}

function clearBox(elementID) {
    var div = document.getElementById(elementID);
      
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

class Game{

    constructor(){

        this._countRows = 22;
        this._countColumns = 22;
        
        this._matrixLetter = this.createMatrix();
        this._selectedPoints = new Array();
    }

    get countRows() {
        return this._countRows;
    }
    
    get countColumns() {
        return this._countColumns;
    }

    get selectedPoints(){
        return this._selectedPoints;
    }

    set selectedPoints(value){
        return this._selectedPoints = value;
    }
    
    createMatrix(){
    
        this._matrixLetter = new Object();
    
        for (let i=0; i < this._countRows; i++) {
            this._matrixLetter[i] = new Array();
            for (let j=0; j < this._countColumns; j++){
                let letterTemp = getRandomInt(65, 90);
                this._matrixLetter[i][j] = String.fromCharCode(letterTemp);
            }
        }
    
        return this._matrixLetter;
    }

    get matrix(){
        return this._matrixLetter;
    }

    shuffleRow(){
        for (let i = this.countRows - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this._matrixLetter[i], this._matrixLetter[j]] = [this._matrixLetter[j], this._matrixLetter[i]];
        }
    }

    transposing(){
        var newArray = [];
        for(var i = 0; i < this.countRows; i++){
            newArray.push([]);
        }

        for(var i = 0; i < this.countRows; i++){
            for(var j = 0; j < this.countRows; j++){
                newArray[j].push(this._matrixLetter[i][j]);
            }
        }
        this._matrixLetter = newArray;
    }
}

let game = new Game;

function generateField(){
    clearBox("field");
    console.log(game.matrix);
    field.style.gridTemplateRows = "repeat(" + game.countRows + ", 1fr)";
    for (let i = 0; i < game.countRows; i++){
        let row = document.createElement('div');
        row.classList.add('field-row');
        field.appendChild(row);
        row.style.gridTemplateColumns = "repeat(" + game.countColumns + ", 1fr)";
        for (let j = 0; j < game.countColumns; j++){
            let cell =  document.createElement('div');
            cell.classList.add('field-cell');
            row.appendChild(cell);
            cell.textContent = game.matrix[i][j];
            cell.addEventListener('click', selectLetter);
            let idx = getIndex(i, j);
            cell.setAttribute('dataIndex', idx);
        }
    }
};

function selectLetter(event){
    let idx = event.target.getAttribute("dataIndex");
    let point = getPoints(idx);
    let x = point[0];
    let y = point[1];
    let lastPoint = game.selectedPoints[game.selectedPoints.length - 1];
    
    if (game.selectedPoints.length === 0){
        dynamicString = dynamicString + (game.matrix[x][y]);
        selectedLetters.textContent = dynamicString;
        event.target.classList.toggle("selected");
        game.selectedPoints.push(point);
    }
    else if (lastPoint[0] == point[0] && lastPoint[1] == point[1]){
        dynamicString = dynamicString.slice(0, -1);
        selectedLetters.textContent = dynamicString;
        event.target.classList.toggle("selected");
        game.selectedPoints.pop();
        
    }
    else{
        if (lastPoint[0] == x-1 && lastPoint[1] == y-1 || lastPoint[0] == x && lastPoint[1] == y-1 || lastPoint[0] == x+1 && lastPoint[1] == y-1 ||
            lastPoint[0] == x-1 && lastPoint[1] == y ||                                             lastPoint[0] == x+1 && lastPoint[1] == y   ||
            lastPoint[0] == x-1 && lastPoint[1] == y+1 || lastPoint[0] == x && lastPoint[1] == y+1 || lastPoint[0] == x+1 && lastPoint[1] == y+1 ){
                if (!event.target.classList.contains("selected")){
                    dynamicString = dynamicString + (game.matrix[x][y]);
                    selectedLetters.textContent = dynamicString;
                    event.target.classList.toggle("selected");
                    game.selectedPoints.push(point);
                }    
        }
    }
}

function clear(){
    dynamicString = "";
    selectedLetters.textContent = dynamicString;
    let selected = document.getElementsByClassName("selected");
    while (selected.length)
        selected[0].classList.remove("selected");
    game.selectedPoints = new Array();
}

btClear.addEventListener('click', clear);

btMix.addEventListener('click', function() {
    clear();
    game.shuffleRow();
    game.transposing();
    generateField();
});

btNew.addEventListener('click', function() {
    clear();
    game.createMatrix();
    generateField();
});



generateField();
