export default function Controls(unitCirlce, canvasElement, {origin}) {
  let mouseDown = false;

  document.addEventListener("mousedown", (evt) => {
    mouseDown = true;
    if (mouseDown && evt.target === canvasElement) {
      unitCirlce.update(getCoordinates(evt));
    }
  });

  document.addEventListener("mouseup", () => {
    mouseDown = false;
  });

  document.addEventListener("mousemove", (evt) => {
    if (mouseDown && evt.target === canvasElement) {
      unitCirlce.update(getCoordinates(evt));
    }
  });

  function getCoordinates(evt) {
    const x = -1 * (origin.x - evt.offsetX);
    const y = origin.y - evt.offsetY;
    return {
      x,
      y,
    };
  }
}

