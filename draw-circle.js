import {colors, fonts} from "./constants.js";

export default function drawCircle(canvas, {canvasWidth, canvasHeight, gridSize}) {
  const radius = gridSize * 10;
  const xOffset = gridSize * 5;
  const x = canvasWidth / 2 - xOffset;
  const y = canvasHeight / 2;
  const axisArrowSize = 6;
  const axisLabelOffset = 10;

  canvas.strokeStyle = colors.default;
  canvas.lineWidth = 1;
  canvas.font = fonts.numberLine;

  canvas.beginPath();

  // Circle
  canvas.arc(x, y, radius, 0, 2 * Math.PI);

  // X-axis
  canvas.moveTo(0, y);
  canvas.lineTo(canvasWidth, y);
  canvas.lineTo(canvasWidth - axisArrowSize, y + axisArrowSize);
  canvas.moveTo(canvasWidth, y);
  canvas.lineTo(canvasWidth - axisArrowSize, y - axisArrowSize);
  canvas.strokeText("x", canvasWidth - axisLabelOffset, y - axisLabelOffset);

  // Y-axis
  canvas.moveTo(x, canvasHeight);
  canvas.lineTo(x, 0);
  canvas.lineTo(x + axisArrowSize, axisArrowSize);
  canvas.moveTo(x, 0);
  canvas.lineTo(x - axisArrowSize, axisArrowSize);
  canvas.strokeText("y", x + axisLabelOffset, axisLabelOffset + 6);

  canvas.stroke();
}

