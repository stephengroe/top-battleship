import Gameboard from "./gameboard";

export default class Player {
  constructor(name, myTurn = false) {
    this.name = name;

    const nameId = this.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    this.gameboard = new Gameboard(10, nameId);
    this.opponent = null;
    this.myTurn = myTurn;
    this.previousMoves = new Set();
    this.isComputer = false;
  }

  attackOpponent([x, y]) {
    if (this.myTurn === false) throw new Error("Not my turn!");

    // Validate coordinates are in bounds
    const max = this.gameboard.dimensions;
    if (x < 0 || x >= max || y < 0 || y >= max) throw new Error("Out of bounds");

    this.myTurn = false;
    this.opponent.myTurn = true;
    return this.opponent.gameboard.receiveAttack([x, y]);;
  }

  generateAiMove() {
    // Generate unique move
    let randomCoords;
    do {
      let randomX = Math.floor(Math.random() * this.gameboard.dimensions);
      let randomY = Math.floor(Math.random() * this.gameboard.dimensions);
      randomCoords = [randomX, randomY];
    } while (this.previousMoves.has(randomCoords.toString()));

    // Store unique move
    this.previousMoves.add(randomCoords.toString());

    return this.attackOpponent(randomCoords);
  }
}
