const { atan2, cos, PI, sin } = Math;

export default class UnitCircle {
  constructor(drawCallBack) {
    this.draw = drawCallBack;
    this.snapping = false;
    this.showRadians = false;
    this.showSnapPoints = false;
    this.snapPoints = [];
    this.createSnapPoints();
  }

  createSnapPoints() {
    // Add every multiple of 30°
    let max = 360 / 30 + 1;
    for (let i = 0; i < max; ++i) {
      this.snapPoints.push(i * PI / 6);
    }

    // Add multiples of 45° (skipping multiples of 90°)
    max = 360 / 45;
    for (let i = 1; i < max; i += 2) {
      this.snapPoints.push(i * PI / 4);
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

  toggleSnapPoints() {
    this.showSnapPoints = !this.showSnapPoints;
    this.draw();
  }

  toggleRadians() {
    this.showRadians = !this.showRadians;
    this.draw();
  }
}
