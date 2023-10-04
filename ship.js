export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits <= this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  }
}