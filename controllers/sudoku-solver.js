class SudokuSolver {
  validate(puzzleString) {
    return puzzleString.length == 81;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = row * 9;
    const rowEnd = rowStart + 9;
    const rowValues = puzzleString.slice(rowStart, rowEnd);
    return !rowValues.includes(value.toString());
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = column; i < 81; i += 9) {
      if (puzzleString[i] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowStart = Math.floor(row / 3) * 27;
    const colStart = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
      const regionValues = puzzleString.slice(
        rowStart + i * 9 + colStart,
        rowStart + i * 9 + colStart + 3
      );
      if (regionValues.includes(value.toString())) {
        return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    const solveHelper = (puzzle) => {
      const index = puzzle.indexOf(".");

      if (index === -1) {
        return puzzle;
      }

      const row = Math.floor(index / 9);
      const col = index % 9;

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        if (
          this.checkRowPlacement(puzzle, row, col, value) &&
          this.checkColPlacement(puzzle, row, col, value) &&
          this.checkRegionPlacement(puzzle, row, col, value)
        ) {
          const updatedPuzzle =
            puzzle.slice(0, index) + value + puzzle.slice(index + 1);
          const result = solveHelper(updatedPuzzle);
          if (result !== false) {
            return result;
          }
        }
      }

      return false;
    };

    return solveHelper(puzzleString);
  }
}

module.exports = SudokuSolver;
