const generatePlayerboard = (numberOfRows, numberOfColums) => {
  const board = [];

  for (let r = 0; r < numberOfRows; r++) {
    const row = [];
    for (let c = 0; c < numberOfColums; c++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

console.log(generatePlayerboard(3, 2));
