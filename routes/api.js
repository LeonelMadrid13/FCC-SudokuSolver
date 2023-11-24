"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

const containsInvalidCharacters = (puzzleString) => {
  const validCharactersRegex = /^[1-9.]+$/;
  return !validCharactersRegex.test(puzzleString);
};

const isValidCoordinate = (coord) => /^[A-I][1-9]$/.test(coord);

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.post('/api/check', (req, res) => {
    const { puzzle, coordinate, value } = req.body;
  
    // Check if required fields are missing
    if (!puzzle || !coordinate || value === undefined) {
      return res.status(400).json({ error: 'Required field(s) missing' });
    }
  
    // Check for invalid characters in the puzzle string
    if (containsInvalidCharacters(puzzle)) {
      return res.status(400).json({ error: 'Invalid characters in puzzle' });
    }
  
    // Check puzzle length
    if (!solver.validate(puzzle)) {
      return res.status(400).json({ error: 'Expected puzzle to be 81 characters long' });
    }
  
    // Check if the coordinate is valid
    if (!isValidCoordinate(coordinate)) {
      return res.status(400).json({ error: 'Invalid coordinate' });
    }
  
    // Check if the value is a number between 1 and 9
    if (isNaN(value) || value < 1 || value > 9) {
      return res.status(400).json({ error: 'Invalid value' });
    }
  
    // Parse the coordinate to row and column indices
    const row = 'ABCDEFGHI'.indexOf(coordinate[0]);
    const col = parseInt(coordinate[1]) - 1;
  
    // Get the value at the provided coordinate in the puzzle
    const currentValue = puzzle[row * 9 + col];
    if (currentValue !== '.' && parseInt(currentValue) == value) {
      return res.json({ valid: true });
    }
  
    // Validate the placement at the given coordinate
    const conflict = [];
  
    if (!solver.checkRowPlacement(puzzle, row, col, value.toString())) {
      conflict.push('row');
    }
  
    if (!solver.checkColPlacement(puzzle, row, col, value.toString())) {
      conflict.push('column');
    }
  
    if (!solver.checkRegionPlacement(puzzle, row, col, value.toString())) {
      conflict.push('region');
    }
  
    const valid = conflict.length === 0;
  
    // Return the result
    if (valid) {
      return res.json({ 'valid': true });
    } else {
      return res.json({ valid, conflict });
    }
  });
  

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) return res.json({ error: "Required field missing" });

    if (containsInvalidCharacters(puzzle)) return res.json({ error: "Invalid characters in puzzle" });
    
    if (!solver.validate(puzzle)) return res.json({ error: "Expected puzzle to be 81 characters long" });
    
    const solution = solver.solve(puzzle);
    if (!solution) return res.json({ error: "Puzzle cannot be solved" });
    
    return res.json({ solution });
  });
};
