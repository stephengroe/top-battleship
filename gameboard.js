import Ship from "./ship";

export default class Gameboard {
  constructor(dimensions) {
    this.board = this.generateBoard(dimensions);
  }

  generateBoard(dimensions) {
    const board = [];

    // Create array of rows
    for (let i=0; i<dimensions; i+=1) {
      const row = [];

      // In each row, create array of cells
      for (let j=0; j<dimensions; j+=1) {
        const cell = new Cell(i, j);
        row.push(cell);
      }

      board.push(row);
    }

    return board;
  }
}

class Cell {
  constructor(x, y) {
    this.position = [x, y];
    this.isEmpty = true;
    this.beenHit = false;
  }
}
