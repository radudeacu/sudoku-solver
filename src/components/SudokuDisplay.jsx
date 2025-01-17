import React from "react";

const SudokuDisplay = ({ board, isSolution = false }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 30px)", gap: "2px" }}>
    {board.flat().map((cell, i) => (
      <div
        key={i}
        style={{
          border: "1px solid black",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isSolution ? "#d4edda" : "#f8d7da", // Color-coding
        }}
      >
        {cell !== "." ? cell : ""}
      </div>
    ))}
  </div>
);

export default SudokuDisplay;
