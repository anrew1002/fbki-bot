'use strict';

// let btClear = document.getElementById("bt-clear");
// let btMix = document.getElementById("bt-mix");
// let btSend = document.getElementById("bt-send");
// let btNew = document.getElementById("bt-new");
// let field = document.getElementById("field");
// let selectedLetters = document.getElementById("selected-letters");
// let dynamicString = "";
let game = new Game;
let size = 12;

function getIndex(y, x) {
    return y * size + x;
};

function getPoints(idx) {
    let x;
    let y;
    if (idx == 0) {
        x = 0;
        y = 0;
    }
    else {
        x = Math.floor(idx / size);
        y = Math.floor(idx % size);
    }
    return [x, y];
};

function generateArray(size) {
    return Array.from(Array(size).keys());
}

function clearBox(elementID) {
    var div = document.getElementById(elementID);

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function generateField(matrix) {
    // console.log(matrix);
    clearBox("field");
    game.setMatrix(matrix);
    field.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('field-row');
        field.appendChild(row);
        row.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.classList.add('field-cell');
            row.appendChild(cell);
            cell.textContent = game.matrix[i][j];
            cell.addEventListener('click', selectLetter);
            let idx = getIndex(i, j);
            cell.setAttribute('dataIndex', idx);
        }
    }
};

function selectLetter(event) {
    let idx = event.target.getAttribute("dataIndex");
    let point = getPoints(idx);
    let x = point[0];
    let y = point[1];
    let lastPoint = game.selectedPoints[game.selectedPoints.length - 1];

    if (game.selectedPoints.length === 0) {
        dynamicString = dynamicString + (game.matrix[x][y]);
        selectedLetters.textContent = dynamicString;
        event.target.classList.toggle("selected");
        game.selectedPoints.push(point);
    }
    else if (lastPoint[0] == point[0] && lastPoint[1] == point[1]) {
        dynamicString = dynamicString.slice(0, -1);
        selectedLetters.textContent = dynamicString;
        event.target.classList.toggle("selected");
        game.selectedPoints.pop();
        

    }
    else {
        if (lastPoint[0] == x - 1 && lastPoint[1] == y - 1 || lastPoint[0] == x && lastPoint[1] == y - 1 || lastPoint[0] == x + 1 && lastPoint[1] == y - 1 ||
            lastPoint[0] == x - 1 && lastPoint[1] == y || lastPoint[0] == x + 1 && lastPoint[1] == y ||
            lastPoint[0] == x - 1 && lastPoint[1] == y + 1 || lastPoint[0] == x && lastPoint[1] == y + 1 || lastPoint[0] == x + 1 && lastPoint[1] == y + 1) {
            if (!event.target.classList.contains("selected")) {
                dynamicString = dynamicString + (game.matrix[x][y]);
                selectedLetters.textContent = dynamicString;
                event.target.classList.toggle("selected");
                game.selectedPoints.push(point);
            }
        }
    }
}

function clear() {
    dynamicString = "";
    selectedLetters.textContent = dynamicString;
    let selected = document.getElementsByClassName("selected");
    while (selected.length)
        selected[0].classList.remove("selected");
    game.selectedPoints = new Array();
}

function sendWord() {
    // Assuming you have an HTML form with an input field and a submit button
    // Prevent the form from submitting normally

    console.log(game.selectedPoints);
    // Get the input value
    const inputData = selectedLetters.textContent

    // Create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', '/api', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up the callback function for when the request completes
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Request succeeded
            const response = JSON.parse(xhr.responseText);
            console.log(response.message); // Process the response as needed
        } else {
            // Request failed
            console.error('Request failed. Status:', xhr.status);
        }
    };

    // Create a JSON payload with the input data
    // const payload = JSON.stringify({ data: inputData, userData: window.Telegram.WebApp.initData });
    const payload = JSON.stringify({ data: inputData, coordinates: game.selectedPoints })
    // Send the request with the payload
    xhr.send(payload);
    clear()
};

btClear.addEventListener('click', clear);

btMix.addEventListener('click', function () {
    // Assuming you have an HTML form with an input field and a submit button
    // Prevent the form from submitting normally

    // Get the input value
    const inputData = selectedLetters.textContent

    // Create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', '/matrix', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up the callback function for when the request completes
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Request succeeded
            const response = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log(response);
            generateField(response);

            console.log(response.message); // Process the response as needed
        } else {
            // Request failed
            console.error('Request failed. Status:', xhr.status);
        }
    };
    // Create a JSON payload with the input data
    const payload = JSON.stringify({ data: inputData, userData: window.Telegram.WebApp.initData });

    // Send the request with the payload
    xhr.send(payload);
    clear()
});

btSend.addEventListener('click', sendWord);

// generateField();

document.addEventListener('DOMContentLoaded', e => {

    window.Telegram.WebApp.enableClosingConfirmation()
    // let photo = document.getElementById("user_photo");
    // photo.src = window.Telegram.WebApp.initDataUnsafe.user.photo_url

    // Assuming you have an HTML form with an input field and a submit button
    // Prevent the form from submitting normally

    // Get the input value
    const inputData = selectedLetters.textContent

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', '/auth', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up the callback function for when the request completes
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Request succeeded
            const response = JSON.parse(xhr.responseText);
            console.log(response.message); // Process the response as needed
        } else {
            // Request failed
            console.error('Request failed. Status:', xhr.status);
        }
    };

    // Create a JSON payload with the input data
    // const payload = JSON.stringify({ data: inputData, userData: window.Telegram.WebApp.initData });
    const payload = JSON.stringify({ userData: "query_id=AAFXbXBIAAAAAFdtcEjftsBg&user=%7B%22id%22%3A1215327575%2C%22first_name%22%3A%22Andrey%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22ontThou%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1684212250&hash=bd3330938286fac2ab07b1732d8ef231b0cb1c4b89281e93eafa89b92b8912e3" });

    // Send the request with the payload
    xhr.send(payload);
}
);