import React from "react";

const SudokuDisplay = ({ board }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 30px)" }}>
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
        }}
      >
        {cell !== "." ? cell : ""}
      </div>
    ))}
  </div>
);

export default SudokuDisplay;
