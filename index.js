import Player from "./player";

function initializeGame() {
  const playerOne = new Player();
  const playerTwo = new Player();
  playerOne.setOpponent(playerTwo);
  playerTwo.setOpponent(playerOne);
  playerOne.myTurn = true;
}

// Initialize "new game" button
const newGameButton = document.querySelector("#new-game-button");
newGameButton.addEventListener("click", (event) => {
  initializeGame();
});