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
  
    const image = new Image();
    image.src = URL.createObjectURL(file);
  
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
  
      // Preprocessing: Convert to grayscale
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
        data[i] = data[i + 1] = data[i + 2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);
  
      Tesseract.recognize(canvas.toDataURL(), "eng", { logger: (info) => console.log(info) })
        .then(({ data: { text } }) => {
          const extractedNumbers = processTextToSudoku(text);
          onExtract(extractedNumbers);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    };
  };

  const processTextToSudoku = (text) => {
    const lines = text.split("\n").filter(Boolean); // Split text into lines and remove empty ones
    const grid = [];
  
    lines.forEach((line) => {
      const digits = line.replace(/[^1-9]/g, ""); // Extract only valid digits
      if (digits.length === 9) {
        grid.push(digits.split(""));
      }
    });
  
    // Ensure the grid is 9x9
    while (grid.length < 9) grid.push(Array(9).fill("."));
  
    return grid.length === 9 && grid.every((row) => row.length === 9)
      ? grid
      : Array(9).fill(Array(9).fill("."));
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

