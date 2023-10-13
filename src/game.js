import Player from "./player";

export default class Game {
  constructor() {
    this.playerOne = new Player("You", true);
    this.playerTwo = new Player("Computer");
    this.gameOver = false;
    
    this.playerOne.opponent = this.playerTwo;
    this.playerTwo.opponent = this.playerOne;
    this.playerTwo.isComputer = true;
  }

  playGame() {
    // After each click, calculate next move
    document.addEventListener("click", () => {
      if (!this.gameOver) {
        this.playTurn();
      }
    });
  }

  playTurn() {
    const human = this.playerOne;
    const computer = this.playerTwo;

    this.calculateGameOver();

    if (!this.gameOver) {
      if (computer.myTurn) computer.generateAiMove();
      this.calculateGameOver();
    }
  }

  calculateGameOver() {
    const human = this.playerOne;
    const computer = this.playerTwo;

    if (computer.gameboard.allSunk) {
      this.gameOver = true;
      this.announceGameOver(human, computer);
    } else if (human.gameboard.allSunk) {
      this.gameOver = true;
      this.announceGameOver(computer, human);
    }
  }

  announceGameOver(winner, loser) {
    setTimeout(() => {
      const modal = document.querySelector("#game-over-modal");

      const winnerText = document.querySelector("#winner-text");  
      winnerText.textContent = `${winner.name} won in ${winner.totalMoves} moves with ${winner.gameboard.remainingShips} remaining ships.`;

      modal.showModal();
    }, 500);
  }
}