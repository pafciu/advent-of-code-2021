import { BingoBoard } from './Day4';

test('asdf', () => {
  const bingo = new BingoBoard(['14 21 17 24  4', '10 16 15  9 19', '18  8 23 26 20', '22 11 13  6  5', ' 2  0 12  3  7']);
  bingo.mark(7);
  bingo.mark(4);
  bingo.mark(9);
  bingo.mark(5);
  bingo.mark(11);
  bingo.mark(17);
  bingo.mark(23);
  bingo.mark(2);
  bingo.mark(0);
  bingo.mark(14);
  bingo.mark(21);
  bingo.mark(24);
  console.log(bingo.unmarked());
  expect(bingo.numbers.length).toBe(25);
});
