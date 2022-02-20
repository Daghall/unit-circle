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
}
