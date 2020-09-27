function validatePuzzle(puzzle) {
  const rows = {};
  const cols = {};
  const boxes = {};

  // Check each row and 3*3 box
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const currNum = puzzle[row][col];
      const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      if (!rows[row]) {
        rows[row] = {};
      }
      if (!boxes[boxIndex]) {
        boxes[boxIndex] = {};
      }

      if (!rows[row][currNum]) {
        rows[row][currNum] = 1;
      } else {
        return false;
      }

      if (!boxes[boxIndex][currNum]) {
        boxes[boxIndex][currNum] = 1;
      } else {
        return false;
      }
    }
  }

  // Check each column
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      const currNum = puzzle[row][col];
      if (!cols[col]) {
        cols[col] = {};
      }

      if (!cols[col][currNum]) {
        cols[col][currNum] = 1;
      } else {
        return false;
      }
    }
  }

  return true;
}

export default validatePuzzle;
