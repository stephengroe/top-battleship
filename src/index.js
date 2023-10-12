import "./style.css";
import Player from "./player";

function renderStartPage() {
  const body = document.querySelector("body");

  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");

  const block = document.createElement("div");
  block.setAttribute("class", "block");

  const heading = document.createElement("h1");
  heading.textContent = "Battleship";

  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("id", "new-game-button");
  newGameButton.textContent = "New Game";
  newGameButton.addEventListener("click", (event) => {
    initializeGame();
    renderGame();
  });

  block.append(heading, newGameButton);
  wrapper.append(block);
  body.append(wrapper);
}

// Create new game
function initializeGame() {
  gameData.playerOne = new Player();
  gameData.playerTwo = new Player();
  gameData.playerOne.setOpponent(gameData.playerTwo);
  gameData.playerTwo.setOpponent(gameData.playerOne);
  gameData.playerOne.myTurn = true;
}

// Render game display
function renderGame() {
  // Empty wrapper
  const wrapper = document.querySelector("#wrapper");
  
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }

  const playerOneBoard = renderPlayerBoard(gameData.playerOne);
  const playerTwoBoard = renderPlayerBoard(gameData.playerTwo);

  wrapper.append(playerOneBoard, playerTwoBoard);
}

// Render player board
function renderPlayerBoard(player) {
  const block = document.createElement("div");
  block.setAttribute("class", "block");

  const playerName = document.createElement("h2");
  playerName.textContent = player.name;

  const board = document.createElement("div");
  board.setAttribute("class", "gameboard");

  const dimensions = player.gameboard.dimensions;

  for (let i=0; i<dimensions; i+=1) {
    for (let j=0; j<dimensions; j+=1) {
      const cellReference = player.gameboard.board[i][j];

      const cellElement = document.createElement("div");
      cellElement.setAttribute("class", "cell");
      cellElement.dataset.coordinates = `${i},${j}`;

      if (cellReference.hasShip) {
        cellElement.classList.add("has-ship");
      }
  
      board.append(cellElement);
    }
  }

  const details = document.createElement("ul");
  details.setAttribute("class", "details");

  const ships = document.createElement("li");
  ships.textContent = `Remaining ships: ...`;

  const moves = document.createElement("li");
  moves.textContent = `Total moves: ...`;

  details.append(ships, moves);

  block.append(playerName, board, details);
  return block;
}


// Starting functions
const gameData = {};
renderStartPage();