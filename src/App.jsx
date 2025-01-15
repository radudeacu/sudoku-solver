import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import SudokuDisplay from "./components/SudokuDisplay";
import { solveSudoku } from "./utils/sudokuSolver";

const App = () => {
  const [sudoku, setSudoku] = useState(null);
  const [solution, setSolution] = useState(null);

  const handleExtract = (grid) => {
    setSudoku(grid);
    setSolution(null);
  };

  const handleSolve = () => {
    const solved = [...sudoku.map((row) => [...row])];
    setSolution(solveSudoku(solved));
  };

  return (
    <div>
      <h1>Sudoku Solver</h1>
      <ImageUploader onExtract={handleExtract} />
      {sudoku && <SudokuDisplay board={sudoku} />}
      {sudoku && (
        <button onClick={handleSolve}>Solve</button>
      )}
      {solution && (
        <>
          <h2>Solution:</h2>
          <SudokuDisplay board={solution} />
        </>
      )}
    </div>
  );
};

export default App;
