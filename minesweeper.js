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
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
};

const getNumberOfSurroundingBombs = (bombBoard, flipRow, flipColumn) => {
  const offSets = [[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1],[-1, 0],[-1, 1]];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfSurroundingBombs = 0;
  offSets.forEach(offset => {
    const neighborRowIndex = flipRow + offset[0];
    const neighborColumnIndex = flipColumn + offset[1];

    // Check to see if row and column are valid tile values on the board.
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfSurroundingBombs++;
      }
    }
  });

  return numberOfSurroundingBombs;
};

const flipTile = (playerBoard, bombBoard, flipRow, flipColumn) => {
  // Check if tile is already flipped, if so, return.
  if (playerBoard[flipRow][flipColumn] !== ' ') {
    return;
  }
  // Check if tile if bomb, if so, place bomb on player Board.
  if (bombBoard[flipRow][flipColumn] === 'B') {
    playerBoard[flipRow][flipColumn] = 'B';
  } else {
    playerBoard[flipRow][flipColumn] = getNumberOfSurroundingBombs(bombBoard, flipRow, flipColumn);
  }
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 3, 3);

printBoard(bombBoard);
console.log(getNumberOfSurroundingBombs(bombBoard, 0, 0));

// console.log('Player Board: ');
// printBoard(playerBoard);
// console.log('Bomb Board: ');
// printBoard(bombBoard);
// flipTile(playerBoard, bombBoard, 1, 1);
// console.log('Player Board: ');
// printBoard(playerBoard);
