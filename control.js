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

//Customised Token
let tokenP1 = "X"; 
let tokenP2 = "O";
let token1 = document.querySelector(".token1");
let token2 = document.querySelector(".token2");
token1.innerHTML=tokenP1;
token2.innerHTML=tokenP2;
const submitButton1= document.querySelector(".submit-buttonP1");
const submitButton2= document.querySelector(".submit-buttonP2");
const submitButtonFile1=document.querySelector("submit-button-fileP1");
const submitButtonFile2=document.querySelector("submit-button-fileP2");
const chooseTokenP1=document.querySelector(".chooseTokenP1");
const chooseTokenP2=document.querySelector(".chooseTokenP2");
const tokenConfP1=document.querySelector(".token-conf-P1");
const tokenConfP2=document.querySelector(".token-conf-P2");
const fileP1=document.querySelector("#fileP1");
const fileP2=document.querySelector("#fileP2");
let fileMess1=document.querySelector(".file-mess1");
let fileMess2=document.querySelector(".file-mess2");
//As pictures need to be placed in multiple areas, an array of the same picture has been created.
let picArray1=[];
let picArray2=[];
//Determines if marker or file- if picture needs to be placed differently. 
let charFileP1="char";
let charFileP2="char";




let gridSquare = "";
let squareId = "";
let turn = "Player1";
let won = false;
let winner=""
let draw = false;
let tempIcon=[];

//Create pseudoelements for grid - Needs to be displayed early!

for (i = 0; i < 9; i++) {
    gridSquare = document.createElement("div");
    gridSquare.setAttribute("class", `gridSquare`)
    gridSquare.setAttribute("id", `gridSquare${[i + 1]}`)
    grid.appendChild(gridSquare);
}

//choose icon function
console.log()

fileP1.addEventListener("change", function(e){
    //displays if token is a character or a file
    charFileP1="file";
    let file1= e.target.files[0];
    fileElementArray(file1, "ImgP1", picArray1, 1)})

    fileP2.addEventListener("change", function(evt){
        //displays if token is a character or a file
        charFileP2="file";
        let file2 =evt.target.files[0];
        fileElementArray(file2, "ImgP2", picArray2, 2)})
    
//To be able to place multiple images, multiple images need to be created. These are stored in an array.
  function fileElementArray(file, ImgP, picArray, num){
    for(i=0; i<20; i++){
        let x = document.createElement("IMG");
        x.src=URL.createObjectURL(file);
        x.setAttribute("width", "70px");
        x.setAttribute("height", "70px");
        //class at the end for easier identification.
        x.setAttribute("class", ImgP);
        picArray.push(x)}
        if(num==1){
        fileChanges(token1, picArray1, fileMess1)};
        if(num==2){
            fileChanges(token2, picArray2, fileMess2)}     
      }

  function fileChanges(token, picArray, fileMess){
    token.innerText="";
    token.appendChild(picArray[0]);
    picArray.shift();
    fileMess.innerText="Picture Uploaded!"
  }

  startTurn()


submitButton1.addEventListener("click", function(e){
    e.preventDefault();
    if(chooseTokenP1.value!=""){tokenP1=chooseTokenP1.value;
    tokenConfP1.innerText=`You have chosen ${tokenP1}`}
    else if(fileP1!=""){
        function myFunction() {
            let pic = document.createElement("IMG");
            pic.setAttribute("src", "img_pulpit.jpg");
            x.setAttribute("width", "3rem");
            x.setAttribute("height", "3rem");
            x.setAttribute("alt", "The Pulpit Rock");
            token1.appendChild(x);
    }}})

submitButton2.addEventListener("click", function(){    tokenP2=chooseTokenP2.value;
    tokenConfP2.innerText=`You have chosen ${tokenP2}`
})


function startTurn() {
    for (let i = 0; i < squareIdArray.length; i++) {
        console.log("squareID i ", squareIdArray[i])
        document.querySelector(squareIdArray[i]).addEventListener("click", function () {
                let tile = squareIdArray[i];
                console.log("tile in start Turn and squareIdAray i", tile, squareIdArray[i])
                if(won==false){placeTile(tile)};
            })
    }
}

function placeTile(tile) {
    console.log("tile in placeTile", tile)

    let selectedTile = document.querySelector(tile);
    console.log("selectedTile", selectedTile)
    if (turn === "Player1"&&selectedTile.innerHTML==="") {
        console.log("tokenP1 in function jsut b4 place tile")
        if(charFileP1=="char"){
            console.log("yes, char")
        selectedTile.innerHTML = tokenP1;
        console.log("selectedTile.innerHTML as not appearing", selectedTile.innerHTML)
    }
        else if(charFileP1==="file"){
            selectedTile.appendChild(picArray1[0]);
            picArray1.shift();
        }
        turn="Player2";
        intro.innerText="Player 2, Please Click on a Square to Place Your Token";
        console.log("selectedTile.innerHTML after updated, same functoin", selectedTile, selectedTile.innerHTML)
        console.log("row1 in player1", row1[0], row1[0].innerHTML)
    }
    else if(turn == "Player2"&&selectedTile.innerText==="") { 
        if(charFileP2=="char"){
        selectedTile.innerText = tokenP2;
        console.log("selectedTile.innerHTML after updated in Player 2, same functoin", selectedTile, selectedTile.innerHTML)}

    else if(charFileP2==="file"){
        selectedTile.appendChild(picArray2[0]);
        picArray2.shift();}
    
    turn="Player1" 
    intro.innerText="Player 1, Please Click on a Square to Place Your Token";
}
    console.log("turn", turn)
    console.log("row1 first innerhtml", row1[0].innerHTML)
    getWinMatrix();
}

//populates arrays where winner can be checked via the checkWinner function
function getWinMatrix(){
    console.log("getWinMatrix running")
for(i=0; i<lines.length; i++){
    for(j=0; j<3; j++){ 
        console.log("linesij before tempicon", lines[i][j]) 
        if(document.querySelector(lines[i][j]).innerText.length===1){
            console.log("length is 1!!!! to be pushed into tempicon")
        tempIcon.push(document.querySelector(lines[i][j]).innerHTML);
        console.log("what pushed into tempIcon", document.querySelector(lines[i][j]).innerHTML)}
        else{tempIcon.push(document.querySelector(lines[i][j]).innerHTML.slice(-4,-2))}
        console.log("tempIcon array", tempIcon)
    }
    checkWinner();
   
tempIcon=[]
}
checkTie()
}

//checks rows / columns / diagonals in array to see if three values in one of these match
function checkWinner(){
    console.log("checkWinner function running")
    if(tempIcon.every((val, i, arr)=>val===arr[0]==true)&&!tempIcon[0]==""&&tempIcon.length==3&&won==false){
        if ((tempIcon[0]==="P1" ||tempIcon[0]==tokenP1)&&won==false){winner="Player1"; 
        intro.innerText = "Player 1 Wins!!!";
        P1WinCount+=1;
        P1Wins.innerText=P1WinCount;
        P2LossCount+=1;
        P2Losses.innerText=P2LossCount;
        won=true}     
        if((tempIcon[0]=="P2" || tempIcon[0]==tokenP2)&&won==false){winner="Player2";
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
    console.log("checkTie function running")
    if(draw===false){
        //check all squares filled and that no-one has won
    if(squareIdArray.every((val, i, arr)=>document.querySelector(val).innerHTML!="")&&won!=true){
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
    squareIdArray.forEach((sq)=>document.querySelector(sq).innerHTML="");
    turn="Player1";
    won=false;
    draw=false;
    winner="";
    intro.innerText = "Player 1, Please Click on a Square to Place Your X";
    placeTile();
   // startTurn();
}




    












