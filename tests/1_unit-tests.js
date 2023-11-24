const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const validPuzzle =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const invalidPuzzle =
  ".a9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const shortPuzzle = ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite("Unit Tests", () => {
  suite("Logic handles", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      assert.isBoolean(solver.validate(validPuzzle));
      assert.equal(solver.validate(validPuzzle), true);
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      assert.isBoolean(solver.containsInvalidCharacters(invalidPuzzle));
      assert.equal(solver.containsInvalidCharacters(invalidPuzzle), true);
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
        assert.isBoolean(solver.validate(shortPuzzle))
        assert.equal(solver.validate(shortPuzzle), false)
    });
    test("Logic handles a valid row placement", () => {
        let validRow = solver.checkRowPlacement(validPuzzle, 0, 0, '7');
        assert.isBoolean(validRow)
        assert.equal(validRow, true)
    })
    test("Logic handles an invalid row placement", () => {
        let validRow = solver.checkRowPlacement(validPuzzle, 0, 0, '1');
        assert.isBoolean(validRow)
        assert.equal(validRow, false)
    })
    test("Logic handles a valid column placement", () => {
        let validCol = solver.checkColPlacement(validPuzzle, 0, 0, '7');
        assert.isBoolean(validCol)
        assert.equal(validCol, true)
    })
    test("Logic handles an invalid column placement", () => {
        let validCol = solver.checkColPlacement(validPuzzle, 0, 0, '1');
        assert.isBoolean(validCol)
        assert.equal(validCol, false)
    })
    test("Logic handles a valid region (3x3 grid) placement", () => {
        let validRegion = solver.checkRegionPlacement(validPuzzle, 0, 0,'7')
        assert.isBoolean(validRegion)
        assert.equal(validRegion, true)
    })
    test("Logic handles an invalid region (3x3 grid) placement", () => {
        let validRegion = solver.checkRegionPlacement(validPuzzle, 0, 0,'1')
        assert.isBoolean(validRegion)
        assert.equal(validRegion, true)

    })
    test("Valid puzzle strings pass the solver", () => {
        let passes = solver.solve(validPuzzle) ? true : false;
        assert.equal(passes, true)
    })
    test("Invalid puzzle strings fail the solver", () => {
        let solved = solver.solve(invalidPuzzle)
        assert.equal(solved, false)
        
    })
    test("Solver returns the expected solution for an incomplete puzzle", () => {
        let solved = solver.solve(validPuzzle)
        assert.equal(solved, '769235418851496372432178956174569283395842761628713549283657194516924837947381625')
    })
  });
});
