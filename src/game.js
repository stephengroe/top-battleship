import Player from "./player";

export default class Game {
  constructor() {
    this.playerOne = new Player(true);
    this.playerTwo = new Player();
    this.active = true;
    
    this.playerOne.setOpponent(this.playerTwo);
    this.playerTwo.setOpponent(this.playerOne);
    this.playerTwo.isComputer = true;
  }

  playGame() {
    let nextPlayer = this.playerOne;

    while (this.active) {
      this.playTurn(nextPlayer);
      nextPlayer = nextPlayer.opponent;
    }
  }

  playTurn(player) {
    let result;
    if (player.isComputer === true) {
      result = player.generateAiMove();
    } else {
      

    }
    
    if (player.opponent.gameboard.allSunk) {
      alert(`${player.name} won!`);
      this.active = false;
    }
  }
}