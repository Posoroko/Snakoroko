// DOM importation
const gameBoard_div = document.getElementById('gameBoard');
const popUpStart_div = document.getElementById('popUpStart');
const popUpEnd_div = document.getElementById('popUpEnd');


// Listen for space bar and start game
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if(gameIsOver === false) {
            popUp(popUpStart_div, 'hide');
            gameOnOff('on');
        } else if(gameIsOver === true ) {
            popUp(popUpEnd_div, 'hide');
        }

            
            
            

            

          
            
            
    
        
    }
  });
//hide pop-ups
function popUp(element, action) {
    console.log('popup' + action);
    if(action === 'show') {
        console.log(element + action + 'show');
        element.style.visibility = "visible";
        console.log(element.style.visibility);
    } else if( action === 'hide') {
        console.log(element + action + 'hide');
        element.style.visibility = "hidden";
        console.log(element.style.visibility);
    }
    
}

//Javascript variables
let array484 = [];
let boardBluePrint = [];
let actionBluePrint = [];
let movement = 1;       // up = 1, right = 2, down = 3, left = 4
let gameStarted = false;
let gameIsOver = false;
let eatFood = true;

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


//create boardBluePrint. return an array with infos for walls, empty, snake and food
let createBoardBluePrint = () => {
    let arr = [];
    for(let i = 0; i < 484; i++ ){
      if(checkIfWall(array484[i])) {
        arr.push(wall);
      } else{
        arr.push(empty);
      }
    }
    return arr;
  }

//render objects with an object
//snake has 2 elements: position and movement
let objects = {
    snake: [230, 252, 274],
    food: undefined,
}
//verify if tile is wall. Return true if index is a wall, false if it's not
function checkIfWall(index) {
    if(index < 22 || index > 460 || index % 22 === 0 || index % 22 === 21) {
        return true
    } else {
        return false;
    }
}
// check if index is on snake
function checkIfSnake(index) {
    for(let i = 0; i < objects.snake.length; i++) {
        if(index == objects.snake[i]) {
            return true;
        } else {
            return false;
        }
    }
}

//place food and bombs at start
function placeFood() {
    do{
        objects.food = Math.floor(Math.random() * (460 - 23)) + 23;
        console.log('food = ' + objects.food);
      } while(checkIfWall(objects.food));
    if (checkIfSnake(objects.food)) {
        placeFood();
    } else {
        return
    }
}


//function gameRenderingBluePrint
function createActionBluePrint() {
    
    let arr = createBoardBluePrint();
    if(eatFood === true){
        placeFood();
        eatFood = false;
    }
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

//export action to the DOM.

let exportToDom = (actionBluePrint) => {
    for(let i = 0; i < 484; i++) {
        if(checkIfWall(i)){
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
    gameIsOver = true;
}



// contrôle du serpent avec les flèches du clavier
    //left = event.key === "ArrowUp"
    //up = event.key === "ArrowLeft"
    //right = event.key === "ArrowRight"
    //down = event.key === "ArrowDown"
document.addEventListener('keydown', event => {
    if(gameIsOver === false) {
        if (event.key === "ArrowUp") {
            movement = 1;
        } else if (event.key === "ArrowDown") {
            movement = 3;
        } else if (event.key === "ArrowRight") {
            movement = 2;
        } else if (event.key === "ArrowLeft") {
            movement = 4;
        }
    }

});

//check if game over
function checkIfGameOver(newTile) {
    if(newTile < 22 || newTile > 460 || newTile % 22 === 0 || newTile % 22 === 21){
        return true;
    } else {
        return false;
    }
}


  //update the snake array: activated by user or by setInterval(). 
  //move receives arrow key or movement variable
function updateSnake() {
    console.log('start of snake update: ' + objects.snake[0]);
    let newTile;
    //snake going up
    if(movement === 1) {
        newTile = objects.snake[0] - 22;
        console.log('new tile going up ' + newTile);
    }
    //snake going right
    else if(movement === 2) {
        newTile = objects.snake[0] + 1;
        console.log('new tile going right ' + newTile);
    }
    //snake going down
    else if(movement === 3){
        newTile = objects.snake[0] + 22;
        console.log('new tile going down ' + newTile);
    }
    //snake going left
    else if(movement === 4) {
        newTile = objects.snake[0] - 1;
        console.log('new tile going left ' + newTile);
    }

    if(checkIfGameOver(newTile)) {
        gameOver();
        gameOnOff('off');
    } else {

        objects.snake.unshift(newTile);
        objects.snake.pop();
        console.log('end of snake update' + objects.snake[0]);
    }
    
}

// start game, make the snake move
let newFrameTimer;
let gameIsOn = false;
function gameOnOff(e) {
    
    if(e === 'on') {
        renderNewFrame();
        newFrameTimer = setInterval(renderNewFrame, 100);
    } else if (e === 'off'){
        clearInterval(newFrameTimer);
    }
    
    function renderNewFrame() {
        updateSnake();
        actionBluePrint = createActionBluePrint();
        clearBoard();
        exportToDom(actionBluePrint);
    }
}












  //initializing game on page load. Empty board with pop up message
function initialiseGame() {
    array484 = createArray484();
    boardBluePrint = createBoardBluePrint();
    exportToDom(boardBluePrint);
}

initialiseGame();


// clear board before rendering new frame
function clearBoard() {
    while(gameBoard_div.lastElementChild) {
        gameBoard_div.removeChild(gameBoard_div.lastElementChild);
    }
}

