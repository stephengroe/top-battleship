import Player from './player';

let playerOne;
let playerTwo;

beforeEach(() => {
  playerOne = new Player();
  playerTwo = new Player();
  playerOne.setOpponent(playerTwo);
  playerTwo.setOpponent(playerOne);
  playerOne.myTurn = true;
});

describe("Player can attack opponent board", () => {
  test('Player gets response for opponent attacks', () => {
    expect(playerOne.attackOpponent([1, 2])).toEqual([false, false]);
  });

  test('Players cannot go twice in a row', () => {
    playerOne.attackOpponent([5, 3]);
    expect(() => {
      playerOne.attackOpponent([3, 6]);
    }).toThrow("Not my turn!");
  });

  test('Players can take turns', () => {
    playerOne.attackOpponent([1, 2]);
    playerTwo.attackOpponent([5, 5]);
    expect(playerOne.attackOpponent([3, 5])).toEqual([false, false]);
  });
});

describe("Prevent illegal moves", () => {
  test("Disallow moves off the board (horizontal, too big)", () => {
    expect(() => {
      playerOne.attackOpponent([10, 2]);
    }).toThrow("Out of bounds");
  });

  test("Disallow moves off the board (horizontal, too small)", () => {
    expect(() => {
      playerOne.attackOpponent([-5, 2]);
    }).toThrow("Out of bounds");
  });

  test("Disallow moves off the board (vertical, too big)", () => {
    expect(() => {
      playerOne.attackOpponent([2, 10]);
    }).toThrow("Out of bounds");
  });

  test("Disallow moves off the board (vertical, too small)", () => {
    expect(() => {
      playerOne.attackOpponent([2, -5]);
    }).toThrow("Out of bounds");
  });

  test.todo("Disallow moves off the board (vertical)");
  test.todo("Disallow duplicate moves");
});

describe("Game engine AI", () => {
  test.todo("Game engine selects random moves");
});
