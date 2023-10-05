import Ship from "./ship";

export default class Gameboard {
  constructor(dimensions) {
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

    // Place horizontal ship
    if (horizontal) {
      for (let i=y; i<(y + shipLength); i += 1){
        this.board[x][i].hasShip = true;
      }
    } else { // Place vertical ship
      for (let i=x; i<(x + shipLength); i += 1){
        this.board[i][y].hasShip = true;
      }
    }

  }
}

class Cell {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.hasShip = false;
    this.beenHit = false;
  }
}
