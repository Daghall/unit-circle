import {colors} from "./constants.js";

export default function drawGrid(canvas, {canvasWidth, canvasHeight, gridSize, origin}) {
  const xAxis = (origin.x / gridSize % gridSize);
  const yAxis = (origin.y / gridSize % gridSize);
  canvas.lineWidth = 1;

  // X-axis
  const columns = canvasWidth / gridSize;
  for (let i = 1; i < columns; ++i) {
    canvas.beginPath();
    if ((i - xAxis) % 5 === 0) {
      canvas.strokeStyle = colors.grid.half;
    } else {
      canvas.strokeStyle = colors.grid.default;
    }
    canvas.moveTo(i * gridSize, 0);
    canvas.lineTo(i * gridSize, canvasHeight);
    canvas.stroke();
  }

  // Y-axis
  const rows = canvasHeight / gridSize;
  for (let i = 1; i < rows; ++i) {
    canvas.beginPath();
    if ((i - yAxis) % 5 === 0) {
      canvas.strokeStyle = colors.grid.half;
    } else {
      canvas.strokeStyle = colors.grid.default;
    }
    canvas.moveTo(0, i * gridSize);
    canvas.lineTo(canvasWidth, i * gridSize);
    canvas.stroke();
  }
}

