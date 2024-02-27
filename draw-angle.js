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

  // Snap points
  if (unitCircle.showSnapPoints) {
    const snapPointSize = 2;
    const textBaseline = canvas.textBaseline;
    canvas.textBaseline = "middle"; // TODO: check
    unitCircle.snapPoints.forEach((point) => {
      canvas.beginPath();
      const pointX = x + Math.cos(point) * radius;
      const pointY = y + Math.sin(point) * radius;
      canvas.arc(pointX, pointY, snapPointSize, 0, 2 * Math.PI);
      canvas.fillStyle = colors.default;
      canvas.fill();
      drawSnapAngle(point);
    });
    canvas.textBaseline = textBaseline;
  }

  function drawSnapAngle(point) {
    if (point === 2 * Math.PI) return;

    const textOffset = 1.5 * gridSize;
    const angleInSixthOfPi = ((2 * Math.PI - point) / (Math.PI / 6)).toFixed(1);
    canvas.fillStyle = colors.snapAngles;
    canvas.strokeStyle = canvas.fillStyle;
    const {numerator, denominator} = getFraction(angleInSixthOfPi);

    let displayText;
    if (unitCircle.showRadians) {
      displayText = `${numerator > 1 ? numerator : ""}π`;
    } else {
      displayText = `${Math.round(360 - point * 180 / Math.PI)}°`;
    }

    // Nudge points aligning with the two axis
    const nudgeX = denominator === 2 ? 1.5 * gridSize : 0;
    const nudgeY = denominator === 1 ? -0.6 * gridSize : 0;

    const pointX = x + Math.cos(point) * (radius + textOffset) + nudgeX;
    const pointY = y + Math.sin(point) * (radius + textOffset) + nudgeY;
    canvas.fillText(displayText, pointX, pointY);

    if (denominator > 1 && unitCircle.showRadians) {
      canvas.fillText(denominator, pointX, pointY + gridSize);

      const xOffset = 4 * Math.min(2, displayText.length);
      const yOffset = 6;
      canvas.beginPath();
      canvas.lineWidth = 1;
      canvas.moveTo(pointX - xOffset, pointY + yOffset);
      canvas.lineTo(pointX + xOffset, pointY + yOffset);
      canvas.stroke();
    }
  }
}

function getFraction(number) {
  let numerator = number;
  let denominator = 6;

  if (number % 1.5 === 0) {
    numerator /= 1.5;
    denominator /= 1.5;
  } else {
    numerator = parseInt(number);
  }

  while (numerator % 2 === 0 && denominator % 2 === 0) {
    numerator /= 2;
    denominator /= 2;
  }

  return {
    numerator,
    denominator,
  };
}
