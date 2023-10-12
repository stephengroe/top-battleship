import Player from "./player";

export default class Game {
  constructor() {
    this.playerOne = new Player(true);
    this.playerTwo = new Player();

    this.playerOne.setOpponent(this.playerTwo);
    this.playerTwo.setOpponent(this.playerOne);
  }
  
  generateRandomShips(shipList) {
    this.playerOne.gameboard.generateShips(shipList);
    this.playerTwo.gameboard.generateShips(shipList);

    console.log(this.playerOne.gameboard);
    console.log(this.playerTwo.gameboard);
  }
}