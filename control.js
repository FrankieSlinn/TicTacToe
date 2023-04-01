const squareIdArray = ["#gridSquare1", "#gridSquare2", "#gridSquare3", "#gridSquare4", "#gridSquare5", "#gridSquare6", "#gridSquare7", "#gridSquare8", "#gridSquare9"]
const row1 = [squareIdArray[0], squareIdArray[1], squareIdArray[2]];
const row2 = [squareIdArray[3], squareIdArray[4], squareIdArray[5]];
const row3 = [squareIdArray[6], squareIdArray[7], squareIdArray[8]];
const col1 = [squareIdArray[0], squareIdArray[3], squareIdArray[6]];
const col2 = [squareIdArray[1], squareIdArray[4], squareIdArray[7]];
const col3 = [squareIdArray[2], squareIdArray[5], squareIdArray[8]];
const dia1 = [squareIdArray[0], squareIdArray[4], squareIdArray[8]];
const dia2 = [squareIdArray[2], squareIdArray[4], squareIdArray[6]];
const lines = [row1, row2, row3, col1, col2, col3, dia1, dia2]
const grid = document.querySelector(".grid");
const intro = document.querySelector(".intro");
const newGame = document.querySelector(".new-game");
const player1Frame=document.querySelector(".player1");
const player2Frame=document.querySelector(".player2");
//Scores
const P1Wins = document.querySelector(".P1Wins");
const P2Wins = document.querySelector(".P2Wins");
const P1Losses = document.querySelector(".P1Losses");
const P2Losses = document.querySelector(".P2Losses");
const P1Draws = document.querySelector(".P1Draws");
const P2Draws = document.querySelector(".P2Draws");
let drawCount = 0;
P1Draws.innerText = drawCount;
P2Draws.innerText = drawCount;
let P1WinCount = 0;
let P2WinCount = 0;
P1Wins.innerText = P1WinCount;
P2Wins.innerText = P2WinCount;
let P1LossCount = 0;
let P2LossCount = 0;
P1Losses.innerText = P1WinCount;
P2Losses.innerText = P2WinCount;

//Customised Token
let changeToken=document.querySelector(".change-token");
let change=document.querySelector(".change");
let backToGame= document.querySelector(".back-to-game");
let sectionToken=document.querySelector(".section-token");
let tokenP1 = "X";
let tokenP2 = "O";
let token1 = document.querySelector(".token1");
let token2 = document.querySelector(".token2");
token1.innerHTML = tokenP1;
token2.innerHTML = tokenP2;
const submitButton1 = document.querySelector(".submit-buttonP1");
const submitButton2 = document.querySelector(".submit-buttonP2");
const submitButtonFile1 = document.querySelector("submit-button-fileP1");
const submitButtonFile2 = document.querySelector("submit-button-fileP2");
const chooseTokenP1 = document.querySelector(".chooseTokenP1");
const chooseTokenP2 = document.querySelector(".chooseTokenP2");
const tokenConfP1 = document.querySelector(".token-conf-P1");
const tokenConfP2 = document.querySelector(".token-conf-P2");
const fileP1 = document.querySelector("#fileP1");
const fileP2 = document.querySelector("#fileP2");
let fileMess1 = document.querySelector(".file-mess1");
let fileMess2 = document.querySelector(".file-mess2");
//As pictures need to be placed in multiple areas, an array of the same picture has been created.
let picArray1 = [];
let picArray2 = [];
//Determines if marker or file- if picture needs to be placed differently. 
let charFileP1 = "char";
let charFileP2 = "char";

//Computer vs Player - Choose between "human" and "computer mode"
let mode="human";
let modeMessage = document.querySelector(".mode-message");
let buttonMode=document.querySelector(".button-mode");
let buttonHum=document.querySelector(".button-hum");
let buttonComp=document.querySelector(".button-comp");


let gridSquare = "";
let squareId = "";
let turn = "Player1";
let won = false;
let winner = ""
let draw = false;
let winMatrix = [];

//Create pseudoelements for grid - Needs to be displayed early!

for (i = 0; i < 9; i++) {
    gridSquare = document.createElement("div");
    gridSquare.setAttribute("class", `gridSquare`)
    gridSquare.setAttribute("id", `gridSquare${[i + 1]}`)
    grid.appendChild(gridSquare);
}

//open token change options
changeToken.addEventListener("click", function(){
    sectionToken.style.display="inline-block";
    changeToken.style.display="none";
    change.style.display="none";
})

backToGame.addEventListener("click", function(){
    sectionToken.style.display="none";
    backToGame.style.display="none";
    changeToken.style.display="inline-block";
})

//choose icon function
fileP1.addEventListener("change", function (e) {
    //displays if token is a character or a file
    picArray1=[];
    charFileP1 = "file";
    let file1 = e.target.files[0];
    fileElementArray(file1, "ImgP1", picArray1, 1)
})

fileP2.addEventListener("change", function (evt) {
    //displays if token is a character or a file
    picArray2=[];
    charFileP2 = "file";
    let file2 = evt.target.files[0];
    fileElementArray(file2, "ImgP2", picArray2, 2)
})

//To be able to place multiple images, multiple images need to be created. These are stored in an array.
function fileElementArray(file, ImgP, picArray, num) {
    for (i = 0; i < 20; i++) {
        let x = document.createElement("IMG");
        x.src = URL.createObjectURL(file);
        x.setAttribute("width", "70px");
        x.setAttribute("height", "70px");
        //class at the end for easier identification.
        x.setAttribute("class", ImgP);
        picArray.push(x)
    }
    if (num == 1) {
        fileChanges(token1, picArray1, fileMess1, tokenConfP1, chooseTokenP1, tokenP1)
    };
    if (num == 2) {
        fileChanges(token2, picArray2, fileMess2, tokenConfP2, chooseTokenP2, tokenP2)
    }
}

function fileChanges(token, picArray, fileMess, tokenConfP, chooseTokenP, tokenP) {
    token.innerText = "";
    token.appendChild(picArray[0]);
    picArray.shift();
    fileMess.innerText = "Picture Uploaded!"
    tokenConfP.innerText = "";
    chooseTokenP.value = "";
    tokenP="";
}

//For char token updates
submitButton1.addEventListener("click", function (e) {
    e.preventDefault();
    charFileP1="char";
    if (chooseTokenP1.value != "") {
        if(chooseTokenP1.value.length<=5){
            tokenP1=chooseTokenP1.value;
        submitCharChanges(token1, tokenP1, tokenConfP1, chooseTokenP1)}
        else{tokenConfP1.innerText = "   Your Token is Over 5 Letters Long. Please Use a Shorter Token"}
    }
})

submitButton2.addEventListener("click", function (e) {
    console.log("chooseTokenP2 in submitlistener", chooseTokenP2)
    e.preventDefault();
    charFileP2="char";
    if (chooseTokenP2.value != "") {
        if(chooseTokenP2.value.length<=5){
            tokenP2=chooseTokenP2.value;
    submitCharChanges(token2, tokenP2, tokenConfP2, chooseTokenP2)
    }
    else{tokenConfP2.innerText = "   Your Token is Over 5 Letters Long. Please Use a Shorter Token"}
}
})

function submitCharChanges(token, tokenP, tokenConfP, chooseTokenP){
    token.innerHTML = ""
    token.innerHTML = chooseTokenP.value;
    tokenP.innerHTML = "";
    console.log("chooseTokenP2", chooseTokenP.value, tokenP)
    //tokenP = chooseTokenP.value;
    console.log("tokenP2", tokenP)
    tokenConfP.innerText = `  You have chosen ${tokenP}`;

}
console.log("tokenP2 outside function", tokenP2)

startTurn()

buttonComp.addEventListener("click", function(){
    mode = "computer";
    document.querySelectorAll(".button-mode").forEach((a)=>{
        a.style.display="none"})
    modeMessage.innerText="You are now playing Einstein, the Computer" ; 
    modeMessage.classList.add("mode-select");  
    })





function startTurn() {
    if(mode==="human"||turn=="Player1"){
    for (let i = 0; i < squareIdArray.length; i++) {
        document.querySelector(squareIdArray[i]).addEventListener("click", function () {
            let tile = squareIdArray[i];
            if (won == false) { placeTile(tile) };
        })
    }
}
}

function placeTile(tile) {
    if (turn === "Player1") {
        showActivePlayer(player1Frame, player2Frame, "activePlayer1", "activePlayer2");
        let selectedTile1=document.querySelector(tile)
        populateTile(charFileP1, picArray1, tokenP1, selectedTile1);
        if(mode=="human"){
        turn = "Player2";
        intro.innerText = "Player 2, Please Click on a Square to Place Your Token";}
        if(mode=="computer"){
            computerTurn();
        }
    }
    else if (turn === "Player2") {
        showActivePlayer(player2Frame, player1Frame, "activePlayer2", "activePlayer1");
        let selectedTile2=document.querySelector(tile); 
        populateTile(charFileP2, picArray2, tokenP2, selectedTile2)
        turn = "Player1"
        intro.innerText = "Player 1, Please Click on a Square to Place Your Token";
    };
    getWinMatrix();
}
function showActivePlayer(playerFrameX, playerFrameY, activePlayerX, activePlayerY){
    playerFrameX.classList.add(activePlayerX);
    playerFrameY.classList.remove(activePlayerY);
}

function placeTokenComp(len, lines){
    for(j=0; j<lines.length; j++){
        if(len==2){
            console.log("player Token Comp running for len 2")
            if(document.querySelector(lines[j]).innerHTML===""){
            document.querySelector(lines[j]).innerHTML=tokenP2;
            compChangePlayer()
            i=15;
            break}}
            
//checks if len is one or if line with 2 char has no empty spaces. In the latter case need to revert to 1 char so can place tile.
            else if(len===1||(len===2&&!document.querySelector(lines[j]).some((a)=>document.querySelector(a).innerHTML===""))){
                console.log("player Token Comp running for len 1")
                if(document.querySelector(lines[j]).innerHTML===""){
                    console.log("in len 1 there is a free value")
                    document.querySelector(lines[j]).innerHTML=tokenP2;
                compChangePlayer()
                i=15;
                break
            }            
    }
}

function compChangePlayer(){ 
        turn="Player1";
        intro.innerText="Player 1, Please Click on a Square to Place Your Token"     
    }

}

function computerTurn(){
filtForP1();
        
}
//filtering criteria to check how many P1 tokens in line with a blank space. Neede for computer mode. 
function filtForP1(){
    longestArrLength=0;
    let longestLine="";
    for(i=0; i<lines.length; i++){
        let filter= lines[i].filter((a=>(document.querySelector(a).innerHTML==tokenP1||document.querySelector(a).innerHTML.slice(-4,-2)=="P1")))
        if(lines[i].some((a)=>document.querySelector(a).innerText===""&&filter.length>longestArrLength)){
            longestArrLength=filter.length;
            longestLine=lines[i];
        }
}
placeTokenComp(longestArrLength, longestLine)
}
    
function populateTile(charFile, picArray, token, selectedTile) {
    if (selectedTile.innerHTML === "") {
        if (charFile == "char") {
            selectedTile.innerHTML = token;
        }
        else if (charFile === "file") {
            selectedTile.appendChild(picArray[0]);//put slice in
            picArray.shift();
        }
    }
}

//populates arrays where winner can be checked via the checkWinner function
function getWinMatrix() {
    console.log("getWinMatrix running")
    for (i = 0; i < lines.length; i++) {
        for (j = 0; j < 3; j++) {
            if (document.querySelector(lines[i][j]).innerHTML.length <= 11) {
                winMatrix.push(document.querySelector(lines[i][j]).innerHTML);
            }
            else {console.log("lines in winmatrix linesij.innerhtml.slice", document.querySelector(lines[i][j]).innerHTML.slice(-4,-2))
                 winMatrix.push(document.querySelector(lines[i][j]).innerHTML.slice(-4,-2)) }
        }
        checkWinner();
        winMatrix = []
    }
    checkTie()
}

//checks rows / columns / diagonals in array to see if three values in one of these match
function checkWinner() {
    if (winMatrix.every((val, i, arr) => val === arr[0] == true) && !winMatrix[0] == "" && winMatrix.length == 3 && won == false) {
        if ((winMatrix[0] === "P1" || winMatrix[0] == tokenP1) && won == false) {
            winChanges("Player1", P1WinCount, P1Wins, P2LossCount, P2Losses)
        }
        if ((winMatrix[0] == "P2" || winMatrix[0] == tokenP2) && won == false) {
            winChanges("Player2", P2WinCount, P2Wins, P1LossCount, P1Losses)
        }
    }

}

function winChanges(player, WinCount, Wins, LossCount, Losses){
    winner=player;
    intro.innerText=`${player} Wins!`
    WinCount+=1;
    Wins.innerText=WinCount;
    LossCount+=1;
    Losses.innerText=LossCount;
    won=true;
}


//if no-one has one checks to see if all squares populated. In this case it is a draw
function checkTie() {
    if (draw === false) {
        //check all squares filled and that no-one has won
        if (squareIdArray.every((val, i, arr) => document.querySelector(val).innerHTML != "") && won != true) {
            intro.innerText = "You Have a Draw!";
            drawCount += 1;
            P1Draws.innerText = drawCount;
            P2Draws.innerText = drawCount;
            draw = true;
        }
    }
}

//starts new game if new game button clicked
newGame.addEventListener("click", startNew);

function startNew() {
    squareIdArray.forEach((sq) => document.querySelector(sq).innerHTML = "");
    turn = "Player1";
    won = false;
    draw = false;
    winner = "";
    winMatrix=[];
    intro.innerText = "Player 1, Please Click on a Square to Place Your X";
    resetMode();
    placeTile();
}


function resetMode(){
    document.querySelectorAll(".button-mode").forEach((a)=>{
        a.style.display="inline-block"})
    modeMessage.innerText="Play against:" ; 
    modeMessage.classList.remove("mode-select"); 
}





















