function calculateBoxIndex(row, col) {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

function generateHashTable(puzzle) {
  const rows = {};
  const cols = {};
  const boxes = {};
  let zeros = 0;

  // Rows and boxes
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const boxIndex = calculateBoxIndex(row, col);

      if (!rows[row]) {
        rows[row] = {};
      }
      if (!boxes[boxIndex]) {
        boxes[boxIndex] = {};
      }

      const currNum = puzzle[row][col];

      if (currNum) {
        rows[row][currNum] = 1;
        boxes[boxIndex][currNum] = 1;
      } else {
        zeros++;
      }
    }
  }

  // Columns
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      if (!cols[col]) {
        cols[col] = {};
      }

      const currNum = puzzle[row][col];
      if (currNum) {
        cols[col][currNum] = 1;
      }
    }
  }
  return [rows, cols, boxes, zeros];
}

function solve(puzzle, init = true, rows, cols, boxes, zeros) {
  if (init) {
    [rows, cols, boxes, zeros] = generateHashTable(puzzle);
    init = false;
  }

  if (zeros === 0) {
    return puzzle;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const currNum = puzzle[row][col];
      const boxIndex = calculateBoxIndex(row, col);

      if (currNum === 0) {
        for (let n = 1; n <= 9; n++) {
          if (!rows[row][n] && !cols[col][n] && !boxes[boxIndex][n]) {
            puzzle[row][col] = n;
            rows[row][n] = 1;
            cols[col][n] = 1;
            boxes[boxIndex][n] = 1;
            zeros--;

            const solution = solve(puzzle, init, rows, cols, boxes, zeros);
            if (!solution) {
              puzzle[row][col] = 0;
              rows[row][n] = 0;
              cols[col][n] = 0;
              boxes[boxIndex][n] = 0;
              zeros++;
            } else {
              return solution;
            }
          }
        }
        return false;
      }
    }
  }
}

export default solve;
