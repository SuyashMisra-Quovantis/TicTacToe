const boxes = Array.from(document.getElementsByClassName("box"));

const markO = "0";
const markX = "X";

const spaces = [];

let currentPlayer;

const restart = () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });

  //add event listeners to boxes on the start of each game
  boxes.forEach((box) => {
    box.innerText = "";
    box.addEventListener("click", boxClicked);
  });

  playText.innerText = `Let's Play!`;
  currentPlayer = markO;
};

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restart);

const isADraw = function () {
  for (let index = 0; index < 9; index++) {
    if (!spaces[index]) {
      return false;
    }
  }
  return true;
};

const boxClicked = function (e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playText.innerText = `${currentPlayer} has won!`;
      return;
    }

    if (isADraw()) {
      playText.innerText = `It's a draw!`;
      return;
    }

    currentPlayer = currentPlayer === markO ? markX : markO;
  }
};

const playerHasWon = function () {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      //TOP ROW
      disableEventListeners();
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      //UPPER LEFT TO LOWER RIGHT
      disableEventListeners();
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      //LEFT COLUMN
      disableEventListeners();
      return true;
    }
  }

  if (spaces[2] === currentPlayer) {
    if (spaces[4] === currentPlayer && spaces[6] === currentPlayer) {
      //UPPER RIGHT TO LOWER LEFT
      disableEventListeners();
      return true;
    }
    if (spaces[5] === currentPlayer && spaces[8] === currentPlayer) {
      //RIGHT COLUMN
      disableEventListeners();
      return true;
    }
  }

  if (spaces[3] === currentPlayer) {
    if (spaces[4] === currentPlayer && spaces[5] === currentPlayer) {
      //MIDDLE ROW
      disableEventListeners();
      return true;
    }
  }

  if (spaces[6] === currentPlayer) {
    if (spaces[7] === currentPlayer && spaces[8] === currentPlayer) {
      //LOWER ROW
      disableEventListeners();
      return true;
    }
  }

  if (spaces[1] === currentPlayer) {
    if (spaces[4] === currentPlayer && spaces[7] === currentPlayer) {
      //MIDDLE COLUMN
      disableEventListeners();
      return true;
    }
  }
};

const disableEventListeners = function () {
  //disable event listeners on each box after the game has ended
  boxes.forEach((box, index) => {
    box.removeEventListener("click", boxClicked);
  });
};

//function to draw borders for each box to create the board
const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      //top row
      styleString += "border-bottom: 3px solid var(--purple);";
    }
    if (index % 3 === 2) {
      //right col
      styleString += "border-left: 3px solid var(--purple);";
    }
    if (index > 5) {
      //bottom row
      styleString += "border-top: 3px solid var(--purple);";
    }
    if (index % 3 === 0) {
      //left col
      styleString += "border-right: 3px solid var(--purple);";
    }

    box.style = styleString;
    box.addEventListener("click", boxClicked); //add event listener to each of the box
  });
};

restart();
drawBoard();
