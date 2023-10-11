import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.gameboard = new Gameboard(10);
    this.previousMoves = [];
    this.opponent = null;
    this.myTurn = false;
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  attackOpponent([x, y]) {
    if (this.myTurn === true) {
      // Validate coordinates are in bounds
      const max = this.gameboard.dimensions;
      if (x < 0 || x >= max || y < 0 || y >= max) {
        throw new Error("Out of bounds");
      }
      this.myTurn = false;
      this.opponent.myTurn = true;
      return this.gameboard.receiveAttack([x, y]);
    } else {
      throw new Error("Not my turn!");
    }
  }
}