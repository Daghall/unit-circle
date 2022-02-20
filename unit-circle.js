export default class UnitCircle {
  constructor(drawCallBack) {
    this.draw = drawCallBack;
  }

  update({x, y}) {
    this.angle = Math.atan2(y, x);
    this.draw();
  }

  getSin() {
    return Math.sin(this.angle);
  }

  getCos() {
    return Math.cos(this.angle);
  }

  getAngleDegrees() {
    const angle = ((this.angle * 180 / (1 * Math.PI)) + 360 ) % 360;
    return {
      angle,
      angleAlt: -360 + angle,
    };
  }
}
