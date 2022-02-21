import {colors} from "./constants.js";

export default function drawGrid(canvas, {gridSize, origin, radius}, unitCircle, controls) {
  const {x, y} = origin;
  const radiusX = unitCircle.getCos() * radius;
  const radiusY = unitCircle.getSin() * radius;
  const angleRadius = 2 * gridSize;
  const angle = unitCircle.angle;

  // Angle
  canvas.lineWidth = 2;
  canvas.strokeStyle = colors.angle;
  canvas.beginPath();
  canvas.arc(x, y, angleRadius, -angle, 0);
  canvas.stroke();

  // Alternate angle
  if (controls.showAlternateAngle) {
    canvas.lineWidth = 1;
    canvas.strokeStyle = colors.angleAlt;
    canvas.beginPath();
    canvas.arc(x, y, angleRadius, 0, -angle || 2 * Math.PI);
    canvas.stroke();
  }

  // Cosine
  canvas.lineWidth = 2;
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

  // Radius
  canvas.lineWidth = 2;
  canvas.strokeStyle = colors.default;
  canvas.beginPath();
  canvas.moveTo(x, y);
  canvas.lineTo(x + radiusX, y - radiusY);
  canvas.stroke();
}

