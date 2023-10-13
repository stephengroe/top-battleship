import Ship from "./ship";

export default class Gameboard {
  constructor(dimensions, elementId) {
    this.dimensions = dimensions;
    this.board = this.generateBoard(dimensions);
    this.ships = [];
    this.elementId = elementId;
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

        placementResult = this.isValidPlacement(randCoordinates, shipList[i], randRotate);

        // If they generate errors, regenerate
      } while (placementResult === false);
      this.placeShip(randCoordinates, shipList[i], randRotate);
    }
  }

  isValidPlacement([x, y], shipLength, horizontal) {
    if (horizontal) { // Validate horizontal ship
      // Test if out of bounds
      if (x + shipLength > this.dimensions) return false;

      // Test for overlap with existing ship
      for (let i=x; i<(x + shipLength); i += 1){
        if (this.board[i][y].hasShip === true) return false
      }
  } else { // Validate vertical ship
      // Test if out of bounds
      if ((y + shipLength) > this.dimensions) return false; // Out of bounds

      // Test for overlap with existing ship
      for (let i=y; i<(y + shipLength); i += 1){
        if (this.board[x][i].hasShip === true) return false
      }
    }
    return true;
  }

  placeShip([x, y], shipLength, horizontal) {
    if (this.isValidPlacement([x, y], shipLength, horizontal) === false) {
      return;
    } 

    const id = Math.floor(Math.random() * 100000);

    // Place horizontal ship
    if (horizontal) {
      for (let i=x; i<(x + shipLength); i += 1){
        this.board[i][y].hasShip = true;
        this.board[i][y].shipId = id;
      }
    } else { // Place vertical ship
      for (let i=y; i<(y + shipLength); i += 1){
        this.board[x][i].hasShip = true;
        this.board[x][i].shipId = id;
      }
    }

    // Add ship objects
    this.ships.push(new Ship(id, shipLength));
  }

  receiveAttack([x, y]) {

    const attackedCell = this.board[x][y];
    let hit = false;
    let sunk = false;
    let hitShip = {};

    // If already attacked, reject
    if (attackedCell.beenAttacked) {
      throw new Error("Duplicate attack");
    } else {
      attackedCell.beenAttacked = true;
    }
    
    // If ship, flag a hit
    if (attackedCell.hasShip) {
      hit = true;
      hitShip = this.ships.find(ship => ship.id === attackedCell.shipId);
      hitShip.hit();

      if (hitShip.isSunk === true) {
        sunk = true;
      }
    }

    this.renderAttack([x, y], hit, sunk, hitShip);
    return [hit, sunk];
  }

  renderAttack(coordinates, hit, sunk, ship) {
    const domCell = document.querySelector(`#${this.elementId} [data-coordinates='${coordinates.toString()}']`);
    domCell.classList.add("attacked");
    
    if (hit) {
      domCell.classList.add("has-ship");
      domCell.dataset.ship = ship.id;
    } 

    // Add cascading explosion animation when ship is sunk
    if (sunk) {
      const shipCells = document.querySelectorAll(`[data-ship='${ship.id}']`);
      let delay = 0;
      shipCells.forEach(cell => {
        setTimeout(() => {
          cell.classList.add("sunk");
        }, delay);
        delay += 200;
      });
    }

    const ships = document.querySelector(`#${this.elementId} li.ships`);
    ships.textContent = `Remaining ships: ${this.remainingShips}`;
  }

  get remainingShips() {
    return this.ships.filter(ship => !ship.isSunk).length;
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
