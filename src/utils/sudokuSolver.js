export const solveSudoku = (board) => {
    const isValid = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
        const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        const boxCol = Math.floor(col / 3) * 3 + (i % 3);
        if (board[boxRow][boxCol] === num) return false;
      }
      return true;
    };
  
    const backtrack = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === ".") {
            for (let num = 1; num <= 9; num++) {
              if (isValid(row, col, num.toString())) {
                board[row][col] = num.toString();
                if (backtrack()) return true;
                board[row][col] = ".";
              }
            }
            return false;
          }
        }
      }
      return true;
    };
  
    backtrack();
    return board;
  };
  