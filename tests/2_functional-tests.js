/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', (done) => {
      const textArea = document.getElementById('text-input');
      textArea.value = '123';

      // Populate the value in the text area to the correct cell in the grid.
      Solver.setGrid(textArea.value);
      const cells = document.querySelectorAll('.sudoku-input');
      const testArr = Array.from(cells)
        .map((cell) => cell.value)
        .filter((str) => str); // filter out empty string
      const expected = ['1', '2', '3'];

      assert.deepEqual(testArr, expected);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', (done) => {
      const textArea = document.getElementById('text-input');
      const cells = document.querySelectorAll('.sudoku-input');
      cells[0].value = '5';
      cells[1].value = '4';
      cells[2].value = '2';
      const expected = `542${'.'.repeat(78)}`;

      // Update the puzzle string in the text area.
      Solver.setTextArea();

      assert.strictEqual(textArea.value, expected);
      done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test('Function clearInput()', (done) => {
      const textArea = document.getElementById('text-input');
      textArea.value =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      Solver.setGrid(textArea.value);

      Solver.clearInput();

      const cells = document.querySelectorAll('.sudoku-input');
      const cellValues = Array.from(cells).filter((cell) => cell.value);

      assert.strictEqual(textArea.value, '');
      assert.deepEqual(cellValues, []);
      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', (done) => {
      const input = Solver.parsePuzzle(
        '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
      );

      Solver.showSolution(Solver.solve(input));

      const cells = document.querySelectorAll('.sudoku-input');
      const cellValues = Array.from(cells).map((cell) => cell.value);
      const solution =
        '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
      const expected = solution.split('');

      assert.deepEqual(cellValues, expected);
      done();
    });
  });
});
