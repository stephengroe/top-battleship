import Player from "./player";

export default class Game {
  constructor() {
    this.playerOne = new Player(null, true);
    this.playerTwo = new Player("Computer");
    this.active = true;
    
    this.playerOne.opponent = this.playerTwo;
    this.playerTwo.opponent = this.playerOne;
    this.playerTwo.isComputer = true;
  }
}