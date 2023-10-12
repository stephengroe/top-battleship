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
    console.log("clicked");
  });

  block.append(heading, newGameButton);
  body.append(block);
}

function initializeGame() {
  const playerOne = new Player();
  const playerTwo = new Player();
  playerOne.setOpponent(playerTwo);
  playerTwo.setOpponent(playerOne);
  playerOne.myTurn = true;
}



// Starting functions
renderStartPage();