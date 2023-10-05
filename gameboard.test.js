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

test('Each gameboard includes correct cells', () => {
  expect(gameboard.board[0][5].coordinates).toEqual([0, 5]);
  expect(gameboard.board[2][9].coordinates).toEqual([2, 9]);
  expect(gameboard.board[8][0].coordinates).toEqual([8, 0]);
});

test('Gameboard places horizontal ship', () => {
  gameboard.placeShip([3, 5], 3, true);
  expect(gameboard.board[3][4].hasShip).toBe(false);
  expect(gameboard.board[3][5].hasShip).toBe(true);
  expect(gameboard.board[3][6].hasShip).toBe(true);
  expect(gameboard.board[3][7].hasShip).toBe(true);
  expect(gameboard.board[3][8].hasShip).toBe(false);
});

test.skip('Gameboard places vertical ship', () => {
  gameboard.placeShip([3, 5], 3, false);
  expect(gameboard.board[2][5].hasShip).toBe(false);
  expect(gameboard.board[3][5].hasShip).toBe(true);
  expect(gameboard.board[4][5].hasShip).toBe(true);
  expect(gameboard.board[5][5].hasShip).toBe(true);
  expect(gameboard.board[6][5].hasShip).toBe(false);
});

test.todo('Gameboard disallows horizontal ships out of bounds');

test.todo('Gameboard disallows vertical ships out of bounds');
