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
const winText = document.querySelector(".winText");
const newGame=document.querySelector(".new-game");
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
                placeTile(tile);
            })
    }
}

function placeTile(tile) {
    console.log("tile in placetile,", tile);
    let selectedTile = document.querySelector(tile);
    if (turn == "Player1") {
        selectedTile.innerText = "X";
    }
    else { selectedTile.innerText = "Y" }
    playerSwitch();
    getWinMatrix();
}
//convert from player 1 to player 2 and vice versa
function playerSwitch() {
    if (turn == "Player1") {
        turn = "Player2";
        intro.innerText = "Player 2, Please Click on a Square to Place Your O";
    } else {
        turn = "Player1";
        intro.innerText = "Player 1, Please Click on a Square to Place Your X";
    }
}




//populates arrays where winner can be checked via the checkWinner function
function getWinMatrix(){
for(i=0; i<lines.length; i++){
    for(j=0; j<3; j++){  
        tempIcon.push(document.querySelector(lines[i][j]).innerText);
    console.log(tempIcon)}
    checkWinner();
    checkTie();
tempIcon=[]
}
}

function checkWinner(){
    if(tempIcon.every((val, i, arr)=>val===arr[0]==true)&&!tempIcon[0]==""&&tempIcon.length==3){
        if (tempIcon[0]==="X"){winner="Player1"; 
        winText.innerText = "Player 1 Wins!!!";
        won=true}     
        if(tempIcon[0]=="Y"){winner="Player2";
        winText.innerText = "Player 2 Wins!!!";
        won=true}
    }
}

function checkTie(){
    if(squareIdArray.every((val, i, arr)=>document.querySelector(val).innerText!="")&&won!=true){
        winText.innerText = "You Have a Draw!"
    }
}
console.log("lines", lines)

newGame.addEventListener("click", startNew);

function startNew(){
    winText.innerText="";
    squareIdArray.forEach((sq)=>document.querySelector(sq).innerText="");
    player="Player1";
    intro.innerText = "Player 1, Please Click on a Square to Place Your X";
    startTurn();
}


//Start new game
//console.log(squareIdArray[0])

//for i in [row1, row2, row3]
//for j in row1[j] if j.value==x then

/*
function winCriteria(){
    if(squareId.innerText==#gridSquare2.innerText==gridSquare3.innerText&&#gridSquare1.innerText!=""||
    #gridSquare4.innerText==#gridSquare5.innerText==gridSquare6.innerText&&#gridSquare4.innerText!=""||
    #gridSquare7.innerText==#gridSquare8.innerText==gridSquare9.innerText&&#gridSquare7.innerText!=""){
        console.log("Winner!")
       winText.innerText="You Won!!!"

}*/

/*
function submitValue() {
  for (let i = 0; i < buttonClasses.length; i++) {
    document
      .querySelector(buttonClasses[i])
      .addEventListener("click", function () {
        //console.log("submitting value", document.querySelector(buttonClasses[i]))
 
        buttonClicked = i + 1;
 
        getInputValue();
      });
  }
}*/

/*

function placeIcon(id){
 console.log("placeIcon function running")
 console.log("id", id);
 if(turn=="Player1"){
 document.querySelector(id).innerText = "X"}
 else{document.querySelector(id)="Y"}

}*/

/*

        document.querySelectorAll(".gridSquare").forEach((sq)=>{
            squareId= gridSquare.getAttribute("id"); })
            console.log("Squareid in function", squareId)
            function(document.querySelector("#squareId"))=>{
            sqid.addEventListener("click", function(){
            console.log("squareId", squareId)
            document.querySelector("#squareId").innerText = "X"})*/







