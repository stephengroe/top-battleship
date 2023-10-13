import "./style.css";
import Game from "./game";

let game;

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
    game = new Game();
    game.playerOne.gameboard.generateShips([5, 4, 3, 3, 2]);
    game.playerTwo.gameboard.generateShips([5, 4, 3, 3, 2]);
    game.playGame();
    renderGame();
  });

  block.append(heading, newGameButton);
  wrapper.append(block);
  body.append(wrapper);
}

// Render game display
function renderGame() {
  // Empty wrapper
  const wrapper = document.querySelector("#wrapper");
  
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }

  const playerOneBoard = renderPlayerBoard(game.playerOne);
  const playerTwoBoard = renderPlayerBoard(game.playerTwo);

  const modal = renderModal();
  
  wrapper.append(playerOneBoard, playerTwoBoard, modal);
}

// Render (hidden) modal to display when game finishes
function renderModal() {
  const modal = document.createElement("dialog");
  modal.setAttribute("id", "game-over-modal");

  const gameOver = document.createElement("h2");
  gameOver.textContent = "Game Over!";

  const winnerText = document.createElement("h3");
  winnerText.setAttribute("id", "winner-text");
  
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("id", "new-game-button");
  newGameButton.textContent = "New Game";
  newGameButton.addEventListener("click", (event) => {
    const modal = document.querySelector("#game-over-modal");
    game = new Game();
    game.playerOne.gameboard.generateShips([5, 4, 3, 3, 2]);
    game.playerTwo.gameboard.generateShips([5, 4, 3, 3, 2]);
    game.playGame();
    renderGame();
  });

  modal.append(gameOver, winnerText, newGameButton);

  return modal;
}

// Render player board
function renderPlayerBoard(player) {
  const block = document.createElement("div");
  block.setAttribute("class", "block");
  block.setAttribute("id", player.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

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

      if (player.isComputer === false) {
        if (cellReference.hasShip) {
          cellElement.classList.add("has-ship");
          cellElement.dataset.ship = cellReference.shipId;
        }
      }

      if (player.isComputer === true) {
        cellElement.addEventListener("click", (e) => {
          player.opponent.attackOpponent([i, j]);
        });
      }
      board.append(cellElement);
    }
  }

  const details = document.createElement("ul");
  details.setAttribute("class", "details");

  const ships = document.createElement("li");
  ships.setAttribute("class", "ships");
  ships.textContent = `Remaining ships: ${player.gameboard.ships.length}`;

  details.append(ships);

  block.append(playerName, board, details);
  return block;
}

// Starting functions
renderStartPage();