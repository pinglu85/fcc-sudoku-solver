import solve from './utils/solve.js';
import validatePuzzle from './utils/validatePuzzle.js';

const textArea = document.getElementById('text-input');
const grid = document.getElementById('sudoku-grid');
const cells = document.querySelectorAll('.sudoku-input');
const errorDiv = document.getElementById('error-msg');
const solveBtn = document.getElementById('solve-button');
const clearBtn = document.getElementById('clear-button');

// Validate input
function validSudokuInput(input) {
  return Number(input) >= 1 && Number(input) <= 9 ? input : false;
}

// Populate the grid with numbers
function setGrid(str) {
  [].forEach.call(cells, (cell, i) => {
    cell.value = validSudokuInput(str[i]) ? str[i] : '';
  });
}

// Populate the text area with numbers
function setTextArea() {
  textArea.value = [].map
    .call(cells, (cell) => {
      const inputVal = cell.value;
      return validSudokuInput(inputVal) ? inputVal : '.';
    })
    .join('');
}

// Check if user has completed the puzzle
function puzzleIsCompleted() {
  const puzzleStrComplete =
    textArea.value.length === 81 && !textArea.value.includes('.');
  const gridComplete = [].map
    .call(cells, (cell) => validSudokuInput(cell.value))
    .reduce((prevCell, curCell) => prevCell && curCell);
  return puzzleStrComplete && gridComplete;
}

// Show if user has successfully solved the puzzle
function puzzleIsSolved() {
  if (puzzleIsCompleted()) {
    const puzzleArr = parsePuzzle(textArea.value);
    errorDiv.textContent = validatePuzzle(puzzleArr)
      ? 'Puzzle solved'
      : 'Invalid solution';
  }
}

// Clear both the text area input and the each cell input
function clearInput() {
  textArea.value = '';
  [].forEach.call(cells, (cell) => {
    cell.value = '';
  });
}

// Parse puzzle string in the text area into a nested array
// for solving the puzzle.
function parsePuzzle(str) {
  // Check if the puzzle string is 81 characters long
  if (str.length !== 81) {
    errorDiv.textContent = 'Error: Expected puzzle to be 81 characters long.';
    return;
  }

  // Create a 2d array and fill it with 0.
  const puzzleArr = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') {
      continue;
    }
    // Check if there are any invalid characters in the puzzle string.
    if (!validSudokuInput(str[i])) {
      errorDiv.textContent = 'Error: Puzzle contains invalid characters.';
      return;
    }

    const row = Math.floor(i / 9);
    const col = i % 9;
    puzzleArr[row][col] = Number(str[i]);
  }
  return puzzleArr;
}

// Parse the puzzle solution which is 2d array
// and populate the text area and the sudoku grid
// with puzzle solution.
function showSolution(arr) {
  const solutionStr = arr
    .reduce((flatArr, subArray) => flatArr.concat(subArray))
    .reduce((str, num) => (str += String(num)), '');

  setGrid(solutionStr);
  setTextArea(solutionStr);
}

// Listen for user input in text area
textArea.addEventListener('input', (e) => {
  setGrid(e.target.value);
  puzzleIsSolved();
});

// Listen for user input in the cell of the grid
grid.addEventListener('input', () => {
  setTextArea();
  puzzleIsSolved();
});

// Listen for click on 'Solve' button
solveBtn.addEventListener('click', () => {
  const puzzle = parsePuzzle(textArea.value);
  if (puzzle) {
    const solution = solve(puzzle);
    console.log(solution);
    if (solution) {
      showSolution(solution);
    }
  }
});

// Listen for click on 'Clear' button
clearBtn.addEventListener('click', clearInput);

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value =
    '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  setGrid(textArea.value);
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    validSudokuInput,
    parsePuzzle,
    validatePuzzle,
    solve,
    setGrid,
    setTextArea,
    clearInput,
    showSolution,
  };
} catch (e) {}
