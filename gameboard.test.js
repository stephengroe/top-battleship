import Gameboard from "./gameboard";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard(10);
});

test('Gameboard class creates an object', () => {
  expect(gameboard).toBeDefined();
});

test('Gameboard has board', () => {
  expect(gameboard.board).toBeDefined();
});

test('Gameboard has 10 rows', () => {
  expect(gameboard.board).toHaveLength(10);
});

test('Each Gameboard row has 10 cells', () => {
  expect(gameboard.board[0]).toHaveLength(10);
  expect(gameboard.board[3]).toHaveLength(10);
  expect(gameboard.board[9]).toHaveLength(10);
});

test.todo('Each gameboard includes correct cells');