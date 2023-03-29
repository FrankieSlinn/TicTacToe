
const grid = document.querySelector(".grid");
const intro = document.querySelector(".intro");
const winText = document.querySelector(".winText");
let gridSquare = "";
let squareId = "";
const squareIdArray = ["#gridSquare1", "#gridSquare2", "#gridSquare3", "#gridSquare4", "#gridSquare5", "#gridSquare6", "#gridSquare7", "#gridSquare8", "#gridSquare9"]
let turn = "Player1";
let won = false;
let draw = false;

//Create pseudoelements for grid
for (i = 0; i < 9; i++) {
    gridSquare = document.createElement("div");
    gridSquare.setAttribute("class", `gridSquare`)
    gridSquare.setAttribute("id", `gridSquare${[i + 1]}`)
    grid.appendChild(gridSquare);
}


startTurn()
document.querySelectorAll(".gridSquare").forEach((a) => console.log(a.getAttribute("id")))


function startTurn() {
    for (let i = 0; i < squareIdArray.length; i++) {
        document.querySelector(squareIdArray[i])
            .addEventListener("click", function () {
                console.log("say what clicked 1st", squareIdArray[i]);
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
    playerSwitch()
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


console.log(squareIdArray.slice(0, 3))
let row1 = squareIdArray.slice(0, 3);
let row2 = squareIdArray.slice(3, 3);
let row3 = squareIdArray.slice(6, 3);
console.log(row1, row2, row3);
let col1=[squareIdArray[0], squareIdArray[3], squareIdArray[6]];
console.log("col1", col1)
console.log(squareIdArray[0])

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







