class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    // If there is a bomb at the flip location, tell player they lost.
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over, here was the final board: ');
      this._board.print();
    }
    // If there is not a bomb at the flip location, and game is not over, tell player current board.
    else if (this._board.hasNonBombEmptySpaces()) {
      console.log('Current Board: ');
      this._board.print();
    // If there is not a bomb at the flip location, and game is over, tell player they won.
    } else {
      console.log('Congratulations on winning! Here was your wining board: ');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfEmptySpaces = numberOfRows * numberOfColumns;

    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  hasNonBombEmptySpaces() {
    return this._numberOfBombs !== this._numberOfEmptySpaces;
  }

  getNumberOfSurroundingBombs(flipRow, flipColumn) {
    const offSets = [[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1],[-1, 0],[-1, 1]];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfSurroundingBombs = 0;
    offSets.forEach(offset => {
      const neighborRowIndex = flipRow + offset[0];
      const neighborColumnIndex = flipColumn + offset[1];

      // Check to see if row and column are valid tile values on the board.
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfSurroundingBombs++;
        }
      }
    });

    return numberOfSurroundingBombs;
  }

  flipTile(flipRow, flipColumn) {
    // Check if tile is already flipped, if so, return.
    if (this._playerBoard[flipRow][flipColumn] !== ' ') {
      return;
    }
    this._numberOfEmptySpaces--;
    // Check if tile if bomb, if so, place bomb on player Board.
    if (this._bombBoard[flipRow][flipColumn] === 'B') {
      this._playerBoard[flipRow][flipColumn] = 'B';
    } else {
      this._playerBoard[flipRow][flipColumn] = this.getNumberOfSurroundingBombs(flipRow, flipColumn);
    }
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Generates a player's board no matter what size it is.
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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
  }

  // console.log(generatePlayerBoard());

  // Generates a player's bomb board no matter what size it is.
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
  }
}
