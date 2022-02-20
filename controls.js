export default class Controls {
  constructor(drawCallback, unitCircle, canvasElement, {origin}) {
    this.drawCallback = drawCallback;
    this.unitCircle = unitCircle;
    this.canvasElement = canvasElement;
    this.origin = origin;
    this.mouseDown = false;
    this.showAlternateAngle = false;
    this.snapping = false;

    this.setupEventListeners();
  }

  toggleAlternateAngle() {
    this.showAlternateAngle = !this.showAlternateAngle;
    this.drawCallback();
  }

  setupEventListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "a":
          this.toggleAlternateAngle();
          break;
        case "s":
          this.unitCircle.toggleSnapping();
          break;
        case "d":
          this.unitCircle.toggleRadians();
          break;
      }
    });

    document.addEventListener("mousedown", (event) => {
      this.mouseDown = true;
      if (this.mouseDown && event.target === this.canvasElement) {
        this.updateUnitCircle(event);
      }
    });

    document.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });

    document.addEventListener("mousemove", (event) => {
      if (this.mouseDown && event.target === this.canvasElement) {
        this.updateUnitCircle(event);
      }
    });
  }

  updateUnitCircle(event) {
    const x = -1 * (this.origin.x - event.offsetX);
    const y = this.origin.y - event.offsetY;
    this.unitCircle.update({
      x,
      y,
    });
  }
}
