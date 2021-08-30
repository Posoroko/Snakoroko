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
let movement = 'up';       
let gameStarted = false;
let gameIsOver = false;
let eatFood = true;
let speed = 200;

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
    snake: [[230, 'up'], [252, 'up'], [274, 'up']],
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
        if(index == objects.snake[i][0]) {
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
        speed -= 5;
        eatFood = false;

    }
    arr[objects.food] = food;
    //render snake
    for(let i = 0; i < objects.snake.length; i++){
        if(i === 0) {
            arr[objects.snake[i][0]] = [head, objects.snake[i][1]];
        } else if (i === objects.snake.length - 1) {
            arr[objects.snake[i][0]] = [tail, objects.snake[i][1]];
        } else {
            arr[objects.snake[i][0]] = [body, objects.snake[i][1]];
        }
    }
    return arr;
}

//export action to the DOM.

let exportToDom = (actionBluePrint) => {
    for(let i = 0; i < 484; i++) {
        let newClass;
        let newSnakeClass;
        if(checkIfWall(i)){
            newClass = 'wall';
        } else if(actionBluePrint[i][0] == head) {
            newClass = 'head' ;
            newSnakeClass = actionBluePrint[i][1];
        } else if(actionBluePrint[i][0] == body) {
            newClass = 'body' ;
            newSnakeClass = actionBluePrint[i][1];
        } else if(actionBluePrint[i][0] == tail) {
            newClass = 'tail' ;
            newSnakeClass = actionBluePrint[i][1];
        } else if( actionBluePrint[i] == food ) {
            newClass = 'food';
        } else {
            newClass = 'empty';
        }
        let newDiv = document.createElement('div');
            newDiv.classList.add(newClass, 'tile');
            if(newClass === 'head' || newClass === 'body' || newClass === 'tail') {
                newDiv.classList.add(newSnakeClass);
            }
            gameBoard_div.appendChild(newDiv);
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
            movement = 'up';
        } else if (event.key === "ArrowDown") {
            movement = 'down';
        } else if (event.key === "ArrowRight") {
            movement = 'right';
        } else if (event.key === "ArrowLeft") {
            movement = 'left';
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
    let newTile = [undefined, undefined];
    //snake going up
    if(movement === 'up') {
        newTile[0] = objects.snake[0][0] - 22;
    }
    //snake going right
    else if(movement === 'right') {
        newTile[0] = objects.snake[0][0] + 1;
    }
    //snake going down
    else if(movement === 'down'){
        newTile[0] = objects.snake[0][0] + 22;
    }
    //snake going left
    else if(movement === 'left') {
        newTile[0] = objects.snake[0][0] - 1;
    }
    newTile[1] = movement;
    

    if(checkIfGameOver(newTile[0])) {
        gameOver();
        gameOnOff('off');
    } else {

        objects.snake.unshift(newTile);
        if(actionBluePrint[newTile[0]] != food) {
            objects.snake.pop();
        } else{
            eatFood = true;
        }
        

    }
    
}

// start game, make the snake move
let newFrameTimer;
let gameIsOn = false;
function gameOnOff(e) {
    
    if(e === 'on') {
        renderNewFrame();
        newFrameTimer = setInterval(renderNewFrame, speed);
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

