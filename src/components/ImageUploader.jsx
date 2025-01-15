import React, { useState } from "react";
import Tesseract from "tesseract.js";

const ImageUploader = ({ onExtract }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractText(file);
    }
  };

  const extractText = (file) => {
    setLoading(true);
    Tesseract.recognize(file, "eng", {
      logger: (info) => console.log(info), // Logs OCR progress
    })
      .then(({ data: { text } }) => {
        const extractedNumbers = processTextToSudoku(text);
        onExtract(extractedNumbers);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const processTextToSudoku = (text) => {
    const lines = text.split("\n").filter(Boolean);
    // Process text to extract Sudoku grid as an array of arrays
    const grid = lines.map((line) =>
      line.replace(/[^1-9.]/g, "").padEnd(9, ".").split("")
    );
    return grid;
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Processing...</p>}
      {image && <img src={image} alt="Uploaded Sudoku" width="300" />}
    </div>
  );
};

export default ImageUploader;

