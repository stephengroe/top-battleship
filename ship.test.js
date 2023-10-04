import Ship from './ship';

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

test('ship class creates an object', () => {
  expect(ship).toBeDefined();
});

test('ship instance has correct length', () => {
  expect(ship.length).toBe(3);
});

test('ship instance starts with 0 hits', () => {
  expect(ship.hits).toBe(0);
});

test('ship hits increases when hit', () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('ship says sunk when hits for full length', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBe(true);
});
