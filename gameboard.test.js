import Gameboard from "./gameboard";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard;
});

test('Gameboard class creates an object', () => {
  expect(gameboard).toBeDefined();
});