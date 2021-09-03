// DOM importation
const gameBoard_div = document.getElementById('gameBoard');
const popUpStart_div = document.getElementById('popUpStart');
const popUpEnd_div = document.getElementById('popUpEnd');

//Javascript variables
let array484 = [];
let boardBluePrint = [];
let actionBluePrint = [];
let movement = 'up';       
let gameIsOn = false;
let gameStarted = false;
let gameIsOver = false;
let eatFood = true;
let speed = 300;

// gallery of objects
let foodLocation;
const wall = 'wall';
const empty = 'empty';
const head = 'head';
const body = 'body';
const tail = 'tail';
const food = 'food';

//snake has 2 elements: position and movement
let objects = {
    snake: [],
    food: undefined,
}


// create array of 484 elements
const createArray484 = () => {
    let arr = [];
    for(let i = 0; i < 484; i++) {
        arr.push(i);
    }
    return arr
};
//create boardBluePrint. return an array with infos for walls and empty cells
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

  //return an array with walls, empty cells, snake and food
function createActionBluePrint() {
    
    let arr = createBoardBluePrint();
    if(eatFood === true){
        placeFood();
        speed -= 60;
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

//export actionBluePrint to the DOM.

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

//create initial snake
function initialiseSnake() {
    return [[230, 'up'], [252, 'up'], [274, 'up']];
}
//place food
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
// Listen for space bar and start game
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if(gameIsOver === false && gameIsOn === false) {
            popUp(popUpStart_div, 'hide');

            gameOnOff('on');
        } else if(gameIsOver === true ) {
            popUp(popUpEnd_div, 'hide');
            gameIsOver = false;
            gameIsOn = false
            clearBoard();
            initialiseGame();
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

    if(objects.snake.flat().includes(index)) {

        return true
    } else{
 
        return false
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
        if (event.key === "ArrowUp" && objects.snake[0][1] != 'down') {
                movement = 'up';
        } else if (event.key === "ArrowDown" && objects.snake[0][1] != 'up') {
            movement = 'down';
        } else if (event.key === "ArrowRight" && objects.snake[0][1] != 'left') {
            movement = 'right';
        } else if (event.key === "ArrowLeft" && objects.snake[0][1] != 'right') {
            movement = 'left';
        }
    }

});

//check if game over
function checkIfGameOver(newTile) {
    if(newTile < 22 || newTile > 460 || newTile % 22 === 0 || newTile % 22 === 21){
        return true;
    } else {
        if(checkIfSnake(newTile)){
            return true;
        } else {
            return false
        }
    }
}

//check if the user tries to go back (180deg not allowed)
function isTryingToGoBack(key) {
    if(key === 'down' && snake[0][1] === 'up') {
        return true
    } else if(key === 'up' && snake[0][1] === 'down') {
        return true
    } else if(key === 'right' && snake[0][1] === 'left') {
        return true
    } else if(key === 'left' && snake[0][1] === 'right') {
        return true
    } else {
        return false
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
        gameIsOn = false;
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

function gameOnOff(e) {
    
    if(e === 'on') {
        gameIsOn = true;
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
    popUp(popUpStart_div, 'show')
    array484 = createArray484();
    objects.snake = [[230, 'up'], [252, 'up'], [274, 'up']];
    boardBluePrint = createBoardBluePrint();
    exportToDom(boardBluePrint);
}

onload = initialiseGame();


// clear board before rendering new frame
function clearBoard() {
    while(gameBoard_div.lastElementChild) {
        gameBoard_div.removeChild(gameBoard_div.lastElementChild);
    }
}

