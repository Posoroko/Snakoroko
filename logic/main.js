// DOM importation
const gameBoard_div = document.getElementById('gameBoard');
const popUpStart_div = document.getElementById('popUpStart');
const popUpEnd_div = document.getElementById('popUpEnd');



document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        popUp(popUpStart_div, 'hide');
        gameStarted = true;
        console.log('game started!!');
    }
  });
//hide pop ups
function popUp(element, action) {
    if(action === 'show') {
        element.style.display = 'flex';
    } else if( action === 'hide') {
        element.style.display = 'none';
    }
    
}

//Javascript variables
let array484 = [];
let boardBluePrint = [];
let actionBluePrint = [];
let movement = 1;
let gameStarted = false;

// gallery of objects
let foodLocation;
const wall = 'wall';
const empty = 'empty';
const head = 'head';
const body = 'body';
const tail = 'tail';
const food = 'food';


// create array of 484 elements
const createArray484 = () => {
    let arr = [];
    for(let i = 0; i < 484; i++) {
        arr.push(i);
    }
    return arr
};


//create boardBluePrint
let createBoardBluePrint = () => {
    let arr = [];
    for(let i = 0; i < 484; i++ ){
      if(array484[i] < 22 || array484[i] > 461 || array484[i] % 22 === 0 || array484[i] % 22 === 21 ){
        arr.push(wall);
      } else{
        arr.push(empty);
      }
    }
    return arr;
  }

//render objects with an object
let objects = {
    snake: [230, 252, 274],
    food: undefined,
}

//place food and bombs at start
function placeFood() {
    do{
        objects.food = Math.floor(Math.random() * (460 - 23)) + 23;
      } while(objects.food % 22 === 0 || objects.food % 22 === 21)
    let conflict = false;
    for(let i = 0; i < objects.snake.length; i++){
        if(objects.food == objects.snake[i]){
            placeFood();
        }
    }
}


//function gameRenderingBluePrint
function createActionBluePrint(boardBluePrint) {
    placeFood();
    let arr = boardBluePrint;
    arr[objects.food] = food;
    //render snake
    for(let i = 0; i < objects.snake.length; i++){
        if(i === 0) {
            arr[objects.snake[i]] = head;
        } else if (i === objects.snake.length - 1) {
            arr[objects.snake[i]] = tail;
        } else {
            arr[objects.snake[i]] = body;
        }
    }
    return arr;
}

//export action to the DOM

let exportToDom = (actionBluePrint) => {
    for(let i = 0; i < 484; i++) {
        if(i < 22 || i > 460 || i % 22 == 0 || i % 22 == 21){
            let newDiv = document.createElement('div');
            newDiv.classList.add('wall', 'tile');
            gameBoard_div.appendChild(newDiv);
        } else if(actionBluePrint[i] == head) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('head', 'tile');
            gameBoard_div.appendChild(newDiv);
        } else if(actionBluePrint[i] == body) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('body', 'tile');
            gameBoard_div.appendChild(newDiv);
        } else if(actionBluePrint[i] == tail) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('tail', 'tile');
            gameBoard_div.appendChild(newDiv);
        } else if( actionBluePrint[i] == food ) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('food', 'tile');
            gameBoard_div.appendChild(newDiv);
        } else {
            let newDiv = document.createElement('div');
            newDiv.classList.add('empty', 'tile');
            gameBoard_div.appendChild(newDiv);
        }
    }
}
// game over, pop up, serpent disparait

function gameOver() {
    popUp(popUpEnd_div, 'show');
}

// contrôle du serpent avec les flèches du clavier
    //left = 37
    //up = 38
    //right = 39
    //down = 40


document.addEventListener('keydown', event => {
    if(gameStarted === true) {
        if (event.key === "ArrowUp") {
            console.log('up');
            movement = 1;
            snakeMoving(objects.snake, 1);
        } else if (event.key === "ArrowDown") {
            console.log('Down');
            movement = 3;
            snakeMoving(objects.snake);
        } else if (event.key === "ArrowRight") {
            console.log('Right');
            movement = 2;
            snakeMoving(objects.snake);
        } else if (event.key === "ArrowLeft") {
            console.log('Left');
            movement = 4;
            snakeMoving(objects.snake);
        }

    }
    
    
  });


function snakeMoving(snake, move) {
    
    let newTile;
    //snake going up
    if(move === 1) {
        newTile = snake[0] - 22;
    }
    //snake going right
    else if(move === 2) {
        newTile = snake[0]++;
    }
    //snake going left
    else if(move === 4) {
        newTile = snake--;
    }
    //snake going down
    else if(move === 3){
        newTile = snake + 22;
    }
    if(newTile < 22 || newTile > 460 || newTile % 22 === 0 || newTile % 22 === 21){
        console.log('game over');
    } else {
        console.log(snake);
        snake.unshift(newTile);
        snake.pop();
        console.log(snake);
        createActionBluePrint(boardBluePrint);
        while(gameBoard_div.lastElementChild) {
            gameBoard_div.removeChild(gameBoard_div.lastElementChild);
        }
        exportToDom(actionBluePrint);
    }
}













  //initializing game
function initialiseGame() {
    array484 = createArray484();
    console.log(array484);
    boardBluePrint = createBoardBluePrint();
    console.log(boardBluePrint);
    actionBluePrint = createActionBluePrint(boardBluePrint);
    exportToDom(actionBluePrint);
    
}

initialiseGame();
