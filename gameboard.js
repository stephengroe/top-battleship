import Ship from "./ship";

export default class Gameboard {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.board = this.generateBoard(dimensions);
    this.ships = [];
  }

  generateBoard(dimensions) {
    const board = [];

    // Create array of columns
    for (let i=0; i<dimensions; i+=1) {
      const column = [];

      // In each column, create array of cells
      for (let j=0; j<dimensions; j+=1) {
        const cell = new Cell(i, j);
        column.push(cell);
      }

      board.push(column);
    }

    return board;
  }

  placeShip([x, y], shipLength, horizontal) {
    // Check if out of bounds
    if ((horizontal && x + shipLength > this.dimensions)
      || (!horizontal && y + shipLength > this.dimensions)) {
      throw new Error("Out of bounds");
    }

    // Place horizontal ship
    if (horizontal) {
      for (let i=x; i<(x + shipLength); i += 1){
        if (this.board[i][y].hasShip === true) { // Test for overlap
          throw new Error("Overlapping ships");
        } else {
          this.board[i][y].hasShip = true;
        }
      }
    } else { // Place vertical ship
      for (let i=y; i<(y + shipLength); i += 1){
        if (this.board[x][i].hasShip === true) { // Test for overlap
          throw new Error("Overlapping ships");
        } else {
          this.board[x][i].hasShip = true;
        }
      }
    }

    // Add ship objects
    this.ships.push(new Ship(shipLength));
  }
}

class Cell {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.hasShip = false;
    this.beenHit = false;
  }
}
