import Player from "./player";

export default class Game {
  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();

    this.playerOne.setOpponent(this.playerTwo);
    this.playerOne.gameboard.generateShips([5, 4, 3, 3, 2]);
    this.playerOne.myTurn = true;

    this.playerTwo.setOpponent(this.playerOne);
    this.playerTwo.gameboard.generateShips([5, 4, 3, 3, 2]);
  }
}