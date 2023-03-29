const squareIdArray = ["#gridSquare1", "#gridSquare2", "#gridSquare3", "#gridSquare4", "#gridSquare5", "#gridSquare6", "#gridSquare7", "#gridSquare8", "#gridSquare9"]
const row1=[squareIdArray[0], squareIdArray[1], squareIdArray[2]];
const row2=[squareIdArray[3], squareIdArray[4], squareIdArray[5]];
const row3=[squareIdArray[6], squareIdArray[7], squareIdArray[8]];
const col1=[squareIdArray[0], squareIdArray[3], squareIdArray[6]];
const col2=[squareIdArray[1], squareIdArray[4], squareIdArray[7]];
const col3=[squareIdArray[2], squareIdArray[5], squareIdArray[8]];
const dia1=[squareIdArray[0], squareIdArray[4], squareIdArray[8]];
const dia2=[squareIdArray[2], squareIdArray[4], squareIdArray[6]];
const lines=[row1, row2, row3, col1, col2, col3, dia1, dia2]
const grid = document.querySelector(".grid");
const intro = document.querySelector(".intro");
const newGame=document.querySelector(".new-game");
//Scores
const P1Wins=document.querySelector(".P1Wins");
const P2Wins=document.querySelector(".P2Wins");
const P1Losses=document.querySelector(".P1Losses");
const P2Losses=document.querySelector(".P2Losses");
const P1Draws=document.querySelector(".P1Draws");
const P2Draws=document.querySelector(".P2Draws");
let drawCount=0;
P1Draws.innerText=drawCount;
P2Draws.innerText=drawCount;
let P1WinCount=0;
let P2WinCount=0;
P1Wins.innerText=P1WinCount;
P2Wins.innerText=P2WinCount;
let P1LossCount=0;
let P2LossCount=0;
P1Losses.innerText=P1WinCount;
P2Losses.innerText=P2WinCount;
let gridSquare = "";
let squareId = "";
let turn = "Player1";
let won = false;
let winner=""
let draw = false;
let tempIcon=[];

//Create pseudoelements for grid
for (i = 0; i < 9; i++) {
    gridSquare = document.createElement("div");
    gridSquare.setAttribute("class", `gridSquare`)
    gridSquare.setAttribute("id", `gridSquare${[i + 1]}`)
    grid.appendChild(gridSquare);
}

//Begin game
startTurn()


function startTurn() {
    for (let i = 0; i < squareIdArray.length; i++) {
        document.querySelector(squareIdArray[i])
            .addEventListener("click", function () {
                let tile = squareIdArray[i];
                if(won==false){placeTile(tile)};
            })
    }
}

function placeTile(tile) {
    let selectedTile = document.querySelector(tile);
    if (turn == "Player1"&&selectedTile.innerText==="") {
        selectedTile.innerText = "X";
        turn="Player2"
    }
    else if(turn == "Player2"&&selectedTile.innerText==="") { selectedTile.innerText = "O";
    turn="Player1" }
    //playerSwitch();
    getWinMatrix();
}
//convert from player 1 to player 2 and vice versa
function playerSwitch() {
    console.log("turn before playerswitch", turn)
    if (turn == "Player1") {
        turn = "Player2";
        intro.innerText = "Player 2, Please Click on a Square to Place Your O";
    } else if (turn=="Player2"){
        turn = "Player1";
        intro.innerText = "Player 1, Please Click on a Square to Place Your X";
    }
    console.log("turn after playerswitch", turn)
}




//populates arrays where winner can be checked via the checkWinner function
function getWinMatrix(){
for(i=0; i<lines.length; i++){
    for(j=0; j<3; j++){  
        tempIcon.push(document.querySelector(lines[i][j]).innerText);
    }
    checkWinner();
   
tempIcon=[]
}
checkTie()
}

//checks rows / columns / diagonals in array to see if three values in one of these match
function checkWinner(){
    if(tempIcon.every((val, i, arr)=>val===arr[0]==true)&&!tempIcon[0]==""&&tempIcon.length==3&&won==false){
        if (tempIcon[0]==="X"&&won==false){winner="Player1"; 
        intro.innerText = "Player 1 Wins!!!";
        P1WinCount+=1;
        P1Wins.innerText=P1WinCount;
        P2LossCount+=1;
        P2Losses.innerText=P2LossCount;
        won=true}     
        if(tempIcon[0]=="O" &&won==false){winner="Player2";
        intro.innerText = "Player 2 Wins!!!";
        P2WinCount+=1;
        P2Wins.innerText=P2WinCount;
        P1LossCount+=1;
        P1Losses.innerText=P1LossCount;
        console.log("P1 loss count", P1LossCount);
        won=true}
    }
   
}


//if no-one has one checks to see if all squares populated. In this case it is a draw
function checkTie(){
    if(draw===false){
    if(squareIdArray.every((val, i, arr)=>document.querySelector(val).innerText!="")&&won!=true){
        console.log("all squares filled", squareIdArray.every((val, i, arr)=>document.querySelector(val).innerText!=""));
        intro.innerText = "You Have a Draw!";
        drawCount+=1;
        console.log("drawCount", drawCount)
P1Draws.innerText=drawCount;
P2Draws.innerText=drawCount;
        draw=true;
    }
}
}

//starts new game if new game button clicked
newGame.addEventListener("click", startNew);

function startNew(){
    //winText.innerText="";
    squareIdArray.forEach((sq)=>document.querySelector(sq).innerText="");
    turn="Player1";
    won=false;
    draw=false;
    winner="";
    intro.innerText = "Player 1, Please Click on a Square to Place Your X";
    startTurn();
}










