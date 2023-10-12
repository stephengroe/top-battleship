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
  
  generateShips(shipList) {
    for (let i=0; i<shipList.length; i++) {
      let randCoordinates;
      let randRotate;
      let placementResult;

      // Generate random ships
      do {
        randCoordinates = [
          Math.floor(Math.random() * this.dimensions),
          Math.floor(Math.random() * this.dimensions),
        ];
        randRotate = Boolean(Math.round(Math.random()));

        placementResult = this.placeShip(randCoordinates, shipList[i], randRotate);

        // If they generate errors, regenerate
      } while (placementResult === false);
    }
  }

  placeShip([x, y], shipLength, horizontal) {
    // Check if out of bounds
    if ((horizontal && x + shipLength > this.dimensions)
      || (!horizontal && y + shipLength > this.dimensions)) {
        return false;
      }

    const id = Math.floor(Math.random() * 100000);

    // Place horizontal ship
    if (horizontal) {
      for (let i=x; i<(x + shipLength); i += 1){
        if (this.board[i][y].hasShip === true) { // Test for overlap
          return false
        } else {
          this.board[i][y].hasShip = true;
          this.board[i][y].shipId = id;
        }
      }
    } else { // Place vertical ship
      for (let i=y; i<(y + shipLength); i += 1){
        if (this.board[x][i].hasShip === true) { // Test for overlap
          return false
        } else {
          this.board[x][i].hasShip = true;
          this.board[x][i].shipId = id;
        }
      }
    }

    // Add ship objects
    this.ships.push(new Ship(id, shipLength));
    return true;
  }

  receiveAttack([x, y]) {

    const attackedCell = this.board[x][y];
    let hit = false;
    let sunk = false;

    // If already attacked, reject
    if (attackedCell.beenAttacked) {
      throw new Error("Duplicate attack");
    } else {
      attackedCell.beenAttacked = true;
    }
    
    // If ship, flag a hit
    if (attackedCell.hasShip) {
      hit = true;
      const hitShip = this.ships.find(ship => ship.id === attackedCell.shipId);
      hitShip.hit();

      if (hitShip.isSunk === true) {
        sunk = true;
      }
    }

    return [hit, sunk];
  }

  get allSunk() {
    return this.ships.every(ship => ship.isSunk);
  }
}

class Cell {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.hasShip = false;
    this.beenAttacked = false;
  }
}
