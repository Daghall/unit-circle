import {colors, fonts} from "./constants.js";

export default function drawCircle(canvas, {canvasWidth, canvasHeight, origin, radius}) {
  const x = origin.x;
  const y = origin.y;
  const axisArrowSize = 6;
  const axisLabelOffset = 10;
  const axisNumberOffset = 7;

  canvas.strokeStyle = colors.default;
  canvas.lineWidth = 1;
  canvas.font = fonts.numberLine;

  canvas.beginPath();

  // Circle
  canvas.arc(x, y, radius, 0, 2 * Math.PI);
  canvas.stroke();
  canvas.textAlign = "right";
  canvas.strokeText("1", x - axisNumberOffset, y - radius - axisNumberOffset);
  canvas.strokeText("-1", x - axisNumberOffset, y + radius + 2 * axisNumberOffset);
  canvas.strokeText("-1", x - radius - axisNumberOffset, y + 2 * axisNumberOffset);
  canvas.textAlign = "left";
  canvas.strokeText("1", x + radius + axisNumberOffset, y + 2 * axisNumberOffset);

  // X-axis
  canvas.moveTo(0, y);
  canvas.lineTo(canvasWidth, y);
  canvas.lineTo(canvasWidth - axisArrowSize, y + axisArrowSize);
  canvas.moveTo(canvasWidth, y);
  canvas.lineTo(canvasWidth - axisArrowSize, y - axisArrowSize);
  canvas.textAlign = "center";
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

