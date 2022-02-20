import {colors} from "./constants.js";

export default function drawGrid(canvas, {origin, radius}, unitCircle) {
  const {x, y} = origin;
  const radiusX = unitCircle.getCos() * radius;
  const radiusY = unitCircle.getSin() * radius;
  canvas.lineWidth = 2;

  // Cosine
  canvas.strokeStyle = colors.cos;
  canvas.beginPath();
  canvas.moveTo(x + radiusX, y - radiusY);
  canvas.lineTo(x + radiusX, y);
  canvas.stroke();

  // Sine
  canvas.strokeStyle = colors.sin;
  canvas.beginPath();
  canvas.moveTo(x + radiusX, y - radiusY);
  canvas.lineTo(x, y - radiusY);
  canvas.stroke();

  // Angle
  canvas.strokeStyle = colors.default;
  canvas.beginPath();
  canvas.moveTo(x, y);
  canvas.lineTo(x + radiusX, y - radiusY);
  canvas.stroke();
}

