import {colors, fonts} from "./constants.js";

class InfoBox {
  constructor(unitCircle, controls) {
    this.unitCircle = unitCircle;
    this.controls = controls;
  }

  getAngle() {
    let angle;

    if (this.unitCircle.showRadians) {
      angle = this.unitCircle.angle / Math.PI;
    } else {
      angle = this.unitCircle.getAngleDegrees().angle;
    }

    return this.formatAngle(angle, this.unitCircle.showRadians);
  }

  getAngleAlt() {
    let angle;

    if (this.unitCircle.showRadians) {
      angle = (2 * Math.PI - this.unitCircle.angle) / -Math.PI;
    } else {
      angle = this.unitCircle.getAngleDegrees().angleAlt;
    }

    return this.formatAngle(angle, this.unitCircle.showRadians);
  }

  getSinValue() {
    return this.formatTrig(this.unitCircle.getSin());
  }

  getCosValue() {
    return this.formatTrig(this.unitCircle.getCos());
  }

  getAltAngleValue() {
    return this.formatBoolean(this.controls.showAlternateAngle);
  }

  getSnappingValue() {
    return this.formatBoolean(this.unitCircle.snapping);
  }

  getRadiansValue() {
    return this.formatBoolean(this.unitCircle.showRadians);
  }

  formatTrig(value) {
    if (isNaN(value)) {
      return "";
    }
    return value.toFixed(3);
  }

  formatAngle(angle, showRadians) {
    if (!isFinite(angle)) {
      return "";
    }
    const suffix = showRadians ? "π" : "°";
    const decimals = showRadians ? 2 : 1;
    return `${angle.toFixed(decimals)}${suffix}`;
  }

  formatBoolean(value) {
    return value ? "✔" : "✘";
  }
}

export default function drawInfoBox(canvas, {gridSize, origin, radius}, unitCircle, controls) {
  const offset = 3 * gridSize;
  const width = 12 * gridSize;
  const height = 12 * gridSize;
  const x = origin.x + radius + offset;
  const y = origin.y + offset;
  const infoBox = new InfoBox(unitCircle, controls);

  // Box
  canvas.fillStyle = colors.infoBox.fill;
  canvas.strokeStyle = colors.infoBox.stroke;
  canvas.beginPath();
  canvas.rect(x, y, width, height);
  canvas.fill();
  canvas.stroke();

  // Text
  const infoRows = [
    {key: "Angle", value: infoBox.getAngle(), color: colors.angle},
    {key: "Angle", value: infoBox.getAngleAlt(), color: colors.angleAlt, show: controls.showAlternateAngle},
    {},
    {key: "Sin", value: infoBox.getSinValue(), color: colors.sin},
    {key: "Cos", value: infoBox.getCosValue(), color: colors.cos},
    {},
    {key: "– Options –", value: "", font: fonts.default},
    {key: "Show alt. angle", value: infoBox.getAltAngleValue(), font: fonts.infoBox.options},
    {key: "Snapping", value: infoBox.getSnappingValue(), font: fonts.infoBox.options},
    {key: "Radians", value: infoBox.getRadiansValue(), font: fonts.infoBox.options},
  ];

  const startX = x + gridSize;
  const startY = y + 2 * gridSize;
  const valueOffset = startX + width - 2 * gridSize;
  const rowOffset = gridSize;
  infoRows.forEach(({key, color, value, font, show = true}, index) => {
    if (!key || !show) return;
    canvas.font = font || fonts.infoBox.key;
    canvas.textAlign = "left";
    canvas.fillStyle = color || colors.default;
    canvas.fillText(key, startX, startY + index * rowOffset);

    canvas.font = fonts.infoBox.value;
    canvas.textAlign = "right";
    canvas.fillText(value, valueOffset, startY + index * rowOffset);
  });

}
