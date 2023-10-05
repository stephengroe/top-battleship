import Gameboard from "./gameboard";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard(10);
});

describe('Gameboard generation', () => {
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
});

describe('Gameboard places ships', () => {
  test('Gameboard places horizontal ship', () => {
    gameboard.placeShip([3, 5], 3, true);
    expect(gameboard.board[2][5].hasShip).toBe(false);
    expect(gameboard.board[3][5].hasShip).toBe(true);
    expect(gameboard.board[4][5].hasShip).toBe(true);
    expect(gameboard.board[5][5].hasShip).toBe(true);
    expect(gameboard.board[6][5].hasShip).toBe(false);
  });
  
  test('Gameboard places vertical ship', () => {
    gameboard.placeShip([3, 5], 3, false);
    expect(gameboard.board[3][4].hasShip).toBe(false);
    expect(gameboard.board[3][5].hasShip).toBe(true);
    expect(gameboard.board[3][6].hasShip).toBe(true);
    expect(gameboard.board[3][7].hasShip).toBe(true);
    expect(gameboard.board[3][8].hasShip).toBe(false);
  });
  
  test('Gameboard disallows horizontal ships out of bounds', () => {
    expect(() => {
      gameboard.placeShip([9, 2], 3, true);
    }).toThrow("Out of bounds");
  });
  
  test('Gameboard disallows vertical ships out of bounds', () => {
    expect(() => {
      gameboard.placeShip([2, 9], 3, false);
    }).toThrow("Out of bounds");
  });

  test('Gameboard disallows overlapping ships', () => {
    gameboard.placeShip([4, 6], 3, true);
    expect(() => {
      gameboard.placeShip([5, 5], 3, false);
    }).toThrow("Overlapping ships");
  });

  test('Gameboard adds ship objects', () => {
    gameboard.placeShip([2, 5], 3, true);
    gameboard.placeShip([6, 3], 2, false);
    expect(gameboard.ships).toHaveLength(2);
  });
});

describe('Gameboard receives attacks', () => {
  beforeEach(() => {
    gameboard.placeShip([3, 5], 3, true);
  });

  test('Gameboard receives hit', () => {
    expect(gameboard.receiveAttack([3, 5])).toEqual([true, false]);
  });

  test('Gameboard receives miss', () => {
    expect(gameboard.receiveAttack([3, 4])).toEqual([false, false]);
  });

  test('Gameboard receives hit and sunk', () => {
    gameboard.receiveAttack([4, 5])
    expect(gameboard.receiveAttack([5, 5])).toEqual([true, true]);
  });

  test('Gameboard rejects duplicate attack', () => {
    gameboard.receiveAttack([3, 5])
    expect(() => {
      gameboard.receiveAttack([3, 5])
    }).toThrow("Duplicate attack");
  });
});
