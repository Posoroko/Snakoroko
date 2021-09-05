// DOM importation
const gameBoard_div = document.getElementById('gameBoard');
const popUpStart_div = document.getElementById('popUpStart');
const popUpEnd_div = document.getElementById('popUpEnd');
const score_span = document.getElementById('score');
const livesBox_div = document.getElementById('livesBox')

//Javascript variables
let array484;
let boardBluePrint = [];
let actionBluePrint = [];
let movement = 'up';       
let gameIsOn = false;
let gameIsOver = false;
let eatFood = true;
let speed = 100;
let newFrameTimer; //setInterval pour la vitesse du snake
let score = 0;
let lives = 3;

// gallery of objects
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

//update score on scoreboard.
function updateScore(how) {
    if(how === 1){
        score++;
        score_span.innerHTML = score;
    } else if(how === 0){
        score = 0;
        score_span.innerHTML = score;
    }
}
//show left over lives in the DOM
function updateLives(num) {
    for(let i = 0; i < num; i++) {
        let vies = document.createElement('img');
        vies.classList.add('lives');
        vies.setAttribute("id", "lives");
        vies.src = 'images/head.png'
        livesBox_div.appendChild(vies);
        console.log(vies);
    }
    
    
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
        eatFood = false;
        updateScore(1);
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



//hide pop-ups
function popUp(element, action) {

    if(action === 'show') {

        element.style.visibility = "visible";

    } else if( action === 'hide') {

        element.style.visibility = "hidden";

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


function gameOnOff(e) {
    if(e === 'on') {
        gameIsOn = true;
        renderNewFrame();
        newFrameTimer = setInterval(renderNewFrame, speed);
    } else if (e === 'off'){
        gameIsOn = false;
        gameIsOver = true;
        clearInterval(newFrameTimer);
        popUp(popUpEnd_div, 'show');
    }
    function renderNewFrame() {
            updateSnake();
            actionBluePrint = createActionBluePrint();
            clearBoard();
            exportToDom(actionBluePrint);

        
    }
}
// game over, pop up, serpent disparait


// Listen for space bar and start game
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if(!gameIsOver && !gameIsOn) {
            popUp(popUpStart_div, 'hide');
            gameOnOff('on');
        } else if(gameIsOver) {
            gameIsOver = false;
            popUp(popUpEnd_div, 'hide');
            clearBoard();
            initialiseGame();
        }
    }
  });

  //initializing game on page load. Empty board with pop up message
function initialiseGame() {
    popUp(popUpStart_div, 'show')
    updateScore(0);
    updateLives(lives);
    array484 = createArray484();
    movement = 'up';
    objects.snake = [[230, 'up'], [252, 'up'], [274, 'up']];
    console.log(objects.snake);
    boardBluePrint = createBoardBluePrint();
    exportToDom(boardBluePrint);
}










// clear board before rendering new frame
function clearBoard() {
    while(gameBoard_div.lastElementChild) {
        gameBoard_div.removeChild(gameBoard_div.lastElementChild);
    }
}

onload = initialiseGame();

//https://github.com/Posoroko/Snakoroko
