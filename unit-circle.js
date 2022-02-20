const { atan2, cos, PI, sin } = Math;

export default class UnitCircle {
  constructor(drawCallBack) {
    this.draw = drawCallBack;
    this.snapping = false;
    this.showRadians = false;
    this.snapPoints = [];
    this.createSnapPoints();
  }

  createSnapPoints() {
    // Add every multiple of 30°
    const max = (2 + 1 / 6) * PI;
    for (let i = 0; i < max; i += PI / 6) {
      this.snapPoints.push(i);
    }

    // Add every multiple of 45°
    for (let i = PI / 4; i < max; i += PI / 2) {
      this.snapPoints.push(i);
    }
    this.snapPoints.sort();
  }

  update({x, y}) {
    this.angle = (atan2(y, x) + (2 * PI)) % (2 * PI);

    if (this.snapping) {
      const snapIndex = this.snapPoints.findIndex((point) => {
        return point > this.angle;
      });
      const a = this.snapPoints[snapIndex - 1];
      const b = this.snapPoints[snapIndex];
      const middle = a + ((b - a) / 2);

      if (middle < this.angle) {
        this.angle = this.snapPoints[snapIndex];
      } else {
        this.angle = this.snapPoints[snapIndex - 1];
      }
    }

    this.draw();
  }

  getSin() {
    return sin(this.angle);
  }

  getCos() {
    return cos(this.angle);
  }

  getAngleDegrees() {
    const angle = (this.angle * 180 / PI);
    return {
      angle,
      angleAlt: -360 + angle,
    };
  }

  toggleSnapping() {
    this.snapping = !this.snapping;
    this.draw();
  }

  toggleRadians() {
    this.showRadians = !this.showRadians;
    this.draw();
  }
}
