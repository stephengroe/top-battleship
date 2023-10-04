import Ship from './ship';

beforeAll(() => {
  const ship = new Ship(5);
});

test('ship starts with correct length', () => {
  expect(ship.length).toBe(5);
});