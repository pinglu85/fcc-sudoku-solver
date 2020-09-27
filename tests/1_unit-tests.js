/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let Solver;

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html').then((dom) => {
      global.window = dom.window;
      global.document = dom.window.document;

      Solver = require('../public/sudoku-solver.js');
    });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function validSudokuInput(input)', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), input[i]);
      });
      done();
    });

    // Invalid characters or numbers are not accepted
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((el) => {
        assert.strictEqual(Solver.validSudokuInput(el), false);
      });
      done();
    });
  });

  suite('Function parsePuzzle(input)', () => {
    test('Parses a valid puzzle string into a 2d array', (done) => {
      const input =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = [
        [0, 0, 9, 0, 0, 5, 0, 1, 0],
        [8, 5, 0, 4, 0, 0, 0, 0, 2],
        [4, 3, 2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 6, 9, 0, 8, 3],
        [0, 9, 0, 0, 0, 0, 0, 6, 0],
        [6, 2, 0, 7, 1, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 0, 1, 9, 4],
        [5, 0, 0, 0, 0, 4, 0, 3, 7],
        [0, 4, 0, 3, 0, 0, 6, 0, 0],
      ];
      assert.deepEqual(Solver.parsePuzzle(input), output);
      done();
    });

    // Puzzles that are not 81 numbers/periods long show the message
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', (done) => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');

      Solver.parsePuzzle(shortStr);
      assert.strictEqual(errorDiv.textContent, errorMsg);

      Solver.parsePuzzle(longStr);
      assert.strictEqual(errorDiv.textContent, errorMsg);
      done();
    });
  });

  suite('Function validatePuzzle(input)', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', (done) => {
      const input = Solver.parsePuzzle(
        '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
      );

      assert.strictEqual(Solver.validatePuzzle(input), true);
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', (done) => {
      const input = Solver.parsePuzzle(
        '779235418851496372432178956174569283395842761628713549283657194516924837947381625'
      );

      assert.strictEqual(Solver.validatePuzzle(input), false);
      done();
    });
  });

  suite('Function solve(input)', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', (done) => {
      const input = Solver.parsePuzzle(
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      );

      assert.deepEqual(Solver.solve(input), [
        [7, 6, 9, 2, 3, 5, 4, 1, 8],
        [8, 5, 1, 4, 9, 6, 3, 7, 2],
        [4, 3, 2, 1, 7, 8, 9, 5, 6],
        [1, 7, 4, 5, 6, 9, 2, 8, 3],
        [3, 9, 5, 8, 4, 2, 7, 6, 1],
        [6, 2, 8, 7, 1, 3, 5, 4, 9],
        [2, 8, 3, 6, 5, 7, 1, 9, 4],
        [5, 1, 6, 9, 2, 4, 8, 3, 7],
        [9, 4, 7, 3, 8, 1, 6, 2, 5],
      ]);
      done();
    });
  });
});
