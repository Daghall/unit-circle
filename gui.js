import controls from "./controls.js";
import {colors} from "./constants.js";
import UnitCircle from "./unit-circle.js";
import drawAngle from "./draw-angle.js";
import drawCircle from "./draw-circle.js";
import drawGrid from "./draw-grid.js";

let unitCircle;
let canvas;
let properties;

function init() {
  const canvasElement = document.querySelector("canvas");
  const canvasWidth = canvasElement.getAttribute("width");
  const canvasHeight = canvasElement.getAttribute("height");
  const center = canvasWidth / 2;
  const gridSize = 15;
  const xOffset = gridSize * 5;
  const origin = {
    x: canvasWidth / 2 - xOffset,
    y: canvasHeight / 2,
  };
  const radius = gridSize * 10;

  canvas = canvasElement.getContext("2d");
  canvas.textAlign = "center";

  properties = {
    canvasWidth,
    canvasHeight,
    center,
    gridSize,
    xOffset,
    origin,
    radius,
  };

  unitCircle = new UnitCircle(draw, properties);
  controls(unitCircle, canvasElement, properties);
  draw(unitCircle);
}

function draw() {
  reset();

  drawGrid(canvas, properties);
  drawCircle(canvas, properties);
  drawAngle(canvas, properties, unitCircle);
}

function reset() {
  canvas.fillStyle = colors.backgound;
  canvas.fillRect(0, 0, properties.canvasWidth, properties.canvasHeight);
}

init();
