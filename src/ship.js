export default class Ship {
  constructor(id, length) {
    this.id = id;
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits <= this.length) {
      this.hits += 1;
    }
  }

  get isSunk() {
    if (this.hits === this.length) return true;
    return false;
  }
}