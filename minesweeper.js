// Generates a player's board no matter what size it is.
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
// r = Row Index
  for (let r = 0; r < numberOfRows; r++) {
    const row = [];
// c = Column Index
    for (let c = 0; c < numberOfColumns; c++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// console.log(generatePlayerBoard());

// Generates a player's bomb board no matter what size it is.
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];
// r = Row Index
  for (let r = 0; r < numberOfRows; r++) {
    const row = [];
// c = Column Index
    for (let c = 0; c < numberOfColumns; c++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';

    numberOfBombsPlaced++;
  }
  return board;
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
