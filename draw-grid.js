import {colors} from "./constants.js";

export default function drawGrid(canvas, {canvasWidth, canvasHeight, gridSize}) {
  canvas.strokeStyle = colors.grid;
  canvas.lineWidth = 1;

  const columns = canvasWidth / gridSize;
  canvas.beginPath();
  for (let i = 1; i < columns; ++i) {
    canvas.moveTo(i * gridSize, 0);
    canvas.lineTo(i * gridSize, canvasHeight);
  }
  canvas.stroke();

  canvas.beginPath();
  const rows = canvasHeight / gridSize;
  for (let i = 1; i < rows; ++i) {
    canvas.moveTo(0, i * gridSize);
    canvas.lineTo(canvasWidth, i * gridSize);
  }
  canvas.stroke();
}

