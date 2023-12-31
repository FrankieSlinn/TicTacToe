const squareIdArray = [
  "#gridSquare1",
  "#gridSquare2",
  "#gridSquare3",
  "#gridSquare4",
  "#gridSquare5",
  "#gridSquare6",
  "#gridSquare7",
  "#gridSquare8",
  "#gridSquare9",
];
const row1 = [squareIdArray[0], squareIdArray[1], squareIdArray[2]];
const row2 = [squareIdArray[3], squareIdArray[4], squareIdArray[5]];
const row3 = [squareIdArray[6], squareIdArray[7], squareIdArray[8]];
const col1 = [squareIdArray[0], squareIdArray[3], squareIdArray[6]];
const col2 = [squareIdArray[1], squareIdArray[4], squareIdArray[7]];
const col3 = [squareIdArray[2], squareIdArray[5], squareIdArray[8]];
const dia1 = [squareIdArray[0], squareIdArray[4], squareIdArray[8]];
const dia2 = [squareIdArray[2], squareIdArray[4], squareIdArray[6]];
const lines = [row1, row2, row3, col1, col2, col3, dia1, dia2];
const grid = document.querySelector(".grid");
const intro = document.querySelector(".intro");
const newGame = document.querySelector(".new-game");
const player1Frame = document.querySelector(".player1");
const player2Frame = document.querySelector(".player2");
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
let changeToken = document.querySelector(".change-token");
let change = document.querySelector(".change");
let backToGame = document.querySelector(".back-to-game");
let sectionToken = document.querySelector(".section-token");
let tokenP1 = "X";
let tokenP2 = "O";
let P2TokenFrame = document.querySelector(".P2TokenFrame");
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
let mode = "human";
let modeMessage = document.querySelector(".mode-message");
let buttonMode = document.querySelector(".button-mode");
let buttonHum = document.querySelector(".button-hum");
let buttonComp = document.querySelector(".button-comp");

//Sounds
let actionSound = new Audio("action-sound-effect.mp3");
let moveSound = new Audio("camera-clicking-sound-effect.mp3");
let endGameSound = new Audio("Ending-sound-effect.mp3");

let gridSquare = "";
let squareId = "";
let won = false;
let winner = "";
let draw = false;
let winMatrix = [];

//open token change options section after change token button selected
changeToken.addEventListener("click", function () {
  sectionToken.style.display = "inline-block";
  backToGame.style.display = "inline-block";
  changeToken.style.display = "none";
  change.style.display = "none";
});
//gets user back to main screen quickly if back to game button is clicked
backToGame.addEventListener("click", function () {
  sectionToken.style.display = "none";
  backToGame.style.display = "none";
  changeToken.style.display = "inline-block";
  change.style.display = "block";
});

//choose token for player 1
fileP1.addEventListener("change", function (e) {
  //displays if token is a character or a file
  picArray1 = [];
  charFileP1 = "file";
  let file1 = e.target.files[0];
  fileElementArray(file1, "ImgP1", picArray1, 1);
});
//choose token for player 2
fileP2.addEventListener("change", function (evt) {
  //displays if token is a character or a file
  picArray2 = [];
  charFileP2 = "file";
  let file2 = evt.target.files[0];
  fileElementArray(file2, "ImgP2", picArray2, 2);
});

//To be able to place multiple image tokens, multiple images need to be created. These are stored in an array.
//Array gets refilled after new game starts
function fileElementArray(file, ImgP, picArray, num) {
  for (i = 0; i < 10; i++) {
    let x = document.createElement("IMG");
    x.src = URL.createObjectURL(file);
    x.setAttribute("width", "70px");
    x.setAttribute("height", "70px");
    //class at the end for easier identification.
    x.setAttribute("class", ImgP);
    picArray.push(x);
  }
  if (num == 1) {
    fileChanges(
      token1,
      picArray1,
      fileMess1,
      tokenConfP1,
      chooseTokenP1,
      tokenP1
    );
  }
  if (num == 2) {
    fileChanges(
      token2,
      picArray2,
      fileMess2,
      tokenConfP2,
      chooseTokenP2,
      tokenP2
    );
  }
}

//Confirmation a picture token has been uploaded -  Picture under player displayed
function fileChanges(
  token,
  picArray,
  fileMess,
  tokenConfP,
  chooseTokenP,
  tokenP
) {
  token.innerText = "";
  token.appendChild(picArray[0]);
  picArray.shift();
  fileMess.innerText = "Picture Uploaded!";
  tokenConfP.innerText = "";
  chooseTokenP.value = "";
  tokenP = "";
}

//Changes token if a character token is selected for player 1
submitButton1.addEventListener("click", function (e) {
  e.preventDefault();
  charFileP1 = "char";
  if (chooseTokenP1.value != "") {
    if (chooseTokenP1.value.length <= 5) {
      tokenP1 = chooseTokenP1.value;
      submitCharChanges(token1, tokenP1, tokenConfP1, chooseTokenP1);
    } else {
      charTooLong(tokenConfP1);
    }
  } else {
    noChar(tokenConfP1);
  }
});
//Changes token if a character token is selected for player 2
submitButton2.addEventListener("click", function (e) {
  console.log("chooseTokenP2 in submitlistener", chooseTokenP2);
  e.preventDefault();
  charFileP2 = "char";
  if (chooseTokenP2.value != "") {
    if (chooseTokenP2.value.length <= 5) {
      tokenP2 = chooseTokenP2.value;
      submitCharChanges(token2, tokenP2, tokenConfP2, chooseTokenP2);
    } else {
      charTooLong(tokenConfP2);
    }
  } else {
    noChar(tokenConfP2);
  }
});

//Error message displays
function charTooLong(tokenConf) {
  tokenConf.innerText =
    "   Your Token is Over 5 Letters Long. Please Use a Shorter Token";
}

function noChar(tokenConf) {
  tokenConf.innerText = "   Please Enter a Token Before You Submit";
}

//clears token innerHTML before a new token is selected to prevent 2 tokens beinf displayed
function submitCharChanges(token, tokenP, tokenConfP, chooseTokenP) {
  token.innerHTML = "";
  token.innerHTML = chooseTokenP.value;
  tokenP.innerHTML = "";
  tokenConfP.innerText = `  You have chosen ${tokenP}`;
}

startTurn();

//Starts computer mode if computer button selected
buttonComp.addEventListener("click", function () {
  mode = "computer";
  charFileP2 = "char";
  backToGame.style.display = "inline-block";
  token2.innerText = "O";
  tokenP2 = "O";
  document.querySelectorAll(".button-mode").forEach((a) => {
    a.style.display = "none";
  });
  modeMessage.innerText = "You are now playing Einstein, the Computer";
  modeMessage.classList.add("mode-select");
});

//Starts human mode if human button selected
buttonHum.addEventListener("click", function () {
  mode = "human";
  humanMode();
});

//Carries out human mode changes
function humanMode() {
  document.querySelectorAll(".button-mode").forEach((a) => {
    a.style.display = "none";
  });
  modeMessage.innerText = "You are now playing a Regular Person";
  modeMessage.classList.add("mode-select");
}
//Checks user cannot continue game if won
function startTurn() {
  getSqHTMLFromLocalStorage();
  localStorageChangesPlayer();
  if (
    mode === "human") {
    for (let i = 0; i < squareIdArray.length; i++) {
      document
        .querySelector(squareIdArray[i])
        .addEventListener("click", function () {
          let tile = squareIdArray[i];
          if (won == false) {
            placeTile(tile);
          }
        });
    }
  }
}

//Routes to functions in flow to place tile / check if there's a winner or draw
function placeTile(tile) {
  getSqHTMLFromLocalStorage();
  localStorageChangesPlayer()
  if (JSON.parse(localStorage.getItem("turn")) === "Player1") {
    let selectedTile1 = document.querySelector(tile);
    localStorage.setItem(`selectedTile1`, JSON.stringify(selectedTile1));
    populateTile(charFileP1, picArray1, tokenP1, selectedTile1);
  } else if (JSON.parse(localStorage.getItem("turn")) === "Player2") {
    let selectedTile2 = document.querySelector(tile);
    populateTile(charFileP2, picArray2, tokenP2, selectedTile2);
  }
  getWinMatrix();
}



//Logic for computer placing tiles
function placeTokenComp(len, lines) {
  for (j = 0; j < lines.length; j++) {
    if (len == 2) {
      if (document.querySelector(lines[j]).innerHTML === "") {
        document.querySelector(lines[j]).innerHTML = tokenP2;
        compChangePlayer();
        i = 15;
        break;
      }
    }
    //checks if len is one or if line with 2 char has no empty spaces. In the latter case need to revert to 1 char so can place tile.
    else if (
      len === 1 ||
      (len === 2 &&
        !document
          .querySelector(lines[j])
          .some(
            (a) =>
              document.querySelector(a).innerHTML === "" &&
              !lines.includes("P2") &&
              !lines.includes(tokenP2)
          ))
    ) {
      if (document.querySelector("#gridSquare5").innerHTML == "") {
        document.querySelector("#gridSquare5").innerHTML = tokenP2;
        i = 15;
        break;
      } else if (document.querySelector(lines[j]).innerHTML === "") {
        document.querySelector(lines[j]).innerHTML = tokenP2;
        compChangePlayer();
        i = 15;
        break;
      }
    }
  }
}

//Ensures the computer takes the middle square if empty
function compPlaceTokenMiddle() {
  if (
    lines[i].includes("#gridSquare5") &&
    document.querySelector("#gridSquare5").innerHTML == ""
  ) {
    document.querySelector("#gridSquare5").innerHTML = tokenP2;
  }
}

//Switches from the computer to player 1
function compChangePlayer() {
  getSqHTMLFromLocalStorage();
  console.log(
    "lsgetitem gsq1 in CompChangeplayer",
    JSON.parse(localStorage.getItem("gridSquare1"))
  );
  localStorage.setItem(`turn`, JSON.stringify("Player1"));
  intro.innerText = "Player 1, Please Click on a Square to Place Your Token";
}

//Initiates computer's turn
function computerTurn() {
  filtForP1();
}
//Filtering criteria to check how many P1 tokens in line with a blank space. Needed for computer mode.
function filtForP1() {
  longestArrLength = 0;
  let longestLine = "";
  for (i = 0; i < lines.length; i++) {
    let filter = lines[i].filter(
      (a) =>
        document.querySelector(a).innerHTML == tokenP1 ||
        document.querySelector(a).innerHTML.slice(-4, -2) == "P1"
    );
    if (
      lines[i].some(
        (a) =>
          document.querySelector(a).innerHTML === "" &&
          filter.length > longestArrLength
      )
    ) {
      longestArrLength = filter.length;
      longestLine = lines[i];
    }
  }
  placeTokenComp(longestArrLength, longestLine);
}

//Places token for humans
function populateTile(charFile, picArray, token, selectedTile) {
  checkHuman();
  if (selectedTile.innerHTML === "") {
    if (charFile == "char") {
      selectedTile.innerHTML = token;
      localStorage.setItem(
        `${selectedTile.id}`,
        JSON.stringify(`${selectedTile.innerHTML}`)
      );
      moveSound.play();
    } else if (charFile === "file") {
      selectedTile.appendChild(picArray[0]); //put slice in
      picArray.shift();
      moveSound.play();
    }
    changePlayer();
  }

  //Checks if a player is a human being
  function checkHuman() {
    if (mode == "human") {
      humanMode();
    }
  }

  //Switches to the next player
  function changePlayer() {
    if (JSON.parse(localStorage.getItem("turn")) === "Player1"&&won===false&&draw===false) {
      if (mode == "human") {
        localStorage.setItem(`turn`, JSON.stringify("Player2"));
        showActivePlayer(
          player2Frame,
          player1Frame,
          "activePlayer2",
          "activePlayer1"
        );
        intro.innerText =
          "Player 2, Please Click on a Square to Place Your Token";
      }
      if (mode == "computer") {
        computerTurn();
      }
    } else if (JSON.parse(localStorage.getItem("turn")) === "Player2"&&won===false&&draw===false) {
      localStorage.setItem(`turn`, JSON.stringify("Player1"));
      showActivePlayer(
        player1Frame,
        player2Frame,
        "activePlayer1",
        "activePlayer2"
      );
      intro.innerText =
        "Player 1, Please Click on a Square to Place Your Token";
    }
  }
  localStorageChanges();
}

//Highlights the frame of the current player
function showActivePlayer(
    playerFrameX,
    playerFrameY,
    activePlayerX,
    activePlayerY
  ) {
    playerFrameX.classList.add(activePlayerX);
    playerFrameY.classList.remove(activePlayerY);
  }

//Ensures that player settings are kept if the machine is refreshed
function localStorageChangesPlayer(){
    if((JSON.parse(localStorage.getItem("turn")) === "Player1" &&won===false&&draw===false)){
        showActivePlayer(
            player1Frame,
            player2Frame,
            "activePlayer1",
            "activePlayer2"
          );
    intro.innerText="Player 1, Please Click on a Square to Place Your Token";
    }
    else if (JSON.parse(localStorage.getItem("turn")) === "Player2" &&won===false&&draw===false) {
        showActivePlayer(
            player2Frame,
            player1Frame,
            "activePlayer2",
            "activePlayer1"
          );
          intro.innerText="Player 2, Please Click on a Square to Place Your Token";
}
}

//Updates local storage data's inner HTML
function localStorageChanges() {
  for (let i = 0; i < squareIdArray.length; i++) {
    if (JSON.parse(localStorage.getItem(`${squareIdArray[i]}`))) {
      JSON.parse(localStorage.getItem(`${squareIdArray[i]}`));
    }
    localStorage.setItem(
      `${squareIdArray[i]}`,
      JSON.stringify(document.querySelector(squareIdArray[i]).innerHTML)
    );
  }
}

//Retrieves innerHTML from local storage
function getSqHTMLFromLocalStorage() {
  for (let i = 0; i < squareIdArray.length; i++) {
    if (JSON.parse(localStorage.getItem(`${squareIdArray[i]}`))) {
      document.querySelector(`${squareIdArray[i]}`).innerHTML = JSON.parse(
        localStorage.getItem(`${squareIdArray[i]}`)
      );
    }
  }
}

//populates arrays where winner can be checked via the checkWinner function
function getWinMatrix() {
  for (i = 0; i < lines.length; i++) {
    for (j = 0; j < 3; j++) {
      if (document.querySelector(lines[i][j]).innerHTML.length <= 11) {
        winMatrix.push(document.querySelector(lines[i][j]).innerHTML);
      } else {
        winMatrix.push(
          document.querySelector(lines[i][j]).innerHTML.slice(-4, -2)
        );
      }
    }
    checkWinner();
    winMatrix = [];
  }
  checkTie();
}

//Checks rows / columns / diagonals in array to see if three values in one of these match to determine winner
function checkWinner() {
  if (
    winMatrix.every((val, i, arr) => (val === arr[0]) == true) &&
    !winMatrix[0] == "" &&
    winMatrix.length == 3 &&
    won == false
  ) {
    if ((winMatrix[0] === "P1" || winMatrix[0] == tokenP1) && won == false) {
      winChanges("Player 1", P1WinCount, P1Wins, P2LossCount, P2Losses);
    }
    if ((winMatrix[0] == "P2" || winMatrix[0] == tokenP2) && won == false) {
      winChanges("Player 2", P2WinCount, P2Wins, P1LossCount, P1Losses);
    }
  }
}

//Updates changes after a player has won
function winChanges(player, WinCount, Wins, LossCount, Losses) {
  winner = player;
  intro.innerText = `${player} Wins!`;
  endGameSound.play();
  grid.classList.add("add-shadow");
  WinCount += 1;
  Wins.innerText = WinCount;
  LossCount += 1;
  Losses.innerText = LossCount;
  won = true;
}

//if no-one has won checks to see if all squares populated. In this case it is a draw
function checkTie() {
  if (draw === false) {
    //check all squares filled and that no-one has won
    if (
      squareIdArray.every(
        (val, i, arr) => document.querySelector(val).innerHTML != ""
      ) &&
      won != true
    ) {
      intro.innerText = "You Have a Draw!";
      endGameSound.play();
      drawCount += 1;
      P1Draws.innerText = drawCount;
      P2Draws.innerText = drawCount;
      draw = true;
    }
  }
}

//starts new game if new game button clicked
newGame.addEventListener("click", startNew);

//Updates changes when new game is started
function startNew() {
  squareIdArray.forEach((sq) => (document.querySelector(sq).innerHTML = ""));
  localStorage.setItem(`turn`, JSON.stringify("Player1"));
  sectionToken.style.display = "none";
  change.style.display = "block";
  changeToken.style.display = "inline-block";
  won = false;
  draw = false;
  winner = "";
  winMatrix = [];
  intro.innerText = "Player 1, Please Click on a Square to Place Your Token";
  grid.classList.remove("add-shadow");
  startNewFunctions();
}

//List of new game functions called when the new game is started
function startNewFunctions() {
  showActivePlayer(
    player1Frame,
    player2Frame,
    "activePlayer1",
    "activePlayer2"
  );
  resetMode();
  startLocalStorageChanges();
  startTurn();
  refillPicArraySetUp();
}

//Updates local storage for new game
function startLocalStorageChanges() {
  for (let i = 0; i < squareIdArray.length; i++) {
    localStorage.setItem(
      `${squareIdArray[i]}`,
      JSON.stringify((document.querySelector(squareIdArray[i]).innerHTML = ""))
    );
    console.log(
      "start again reset local storage should be null",
      JSON.parse(localStorage.getItem(`${gridSquare[i]}`))
    );
  }
}

//Resets the player mode
function resetMode() {
  document.querySelectorAll(".button-mode").forEach((a) => {
    a.style.display = "inline-block";
  });
  modeMessage.innerText = "Play against:";
  modeMessage.classList.remove("mode-select");
}

//Ensures the user can continue to play with images by refilling image array if low
function refillPicArraySetUp() {
  console.log("refillPicArraySetUp running", picArray1, picArray2);
  if (picArray1.length < 10 && charFileP1 == "file") {
    refillPicArray(".ImgP1", picArray1);
  } else if (picArray2.length < 10 && charFileP2 == "file") {
    refillPicArray(".ImgP2", picArray2);
  }
}

// Creates a copy of image to repenish image array
function refillPicArray(Img, picArray) {
  let el = document.querySelector(Img);
  let clone = el.cloneNode(true);
  for (let i = 0; i < 20; i++) picArray.push(clone);
  console.log("refillPicArraySetUp running", picArray1, picArray2);
}
