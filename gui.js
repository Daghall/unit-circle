import controls from "./controls.js";
import {colors} from "./constants.js";
import UnitCirlce from "./unit-circle.js";
import drawCircle from "./draw-circle.js";
import drawGrid from "./draw-grid.js";

let unitCirlce;
let canvas;
const properties = {};

function init() {
  const canvasElement = document.querySelector("canvas");
  canvas = canvasElement.getContext("2d");
  properties.canvasWidth = canvasElement.getAttribute("width");
  properties.canvasHeight = canvasElement.getAttribute("height");
  properties.center = properties.canvasWidth / 2;

  properties.gridSize = 15;

  canvas.textAlign = "center";

  unitCirlce = new UnitCirlce(draw);
  controls(unitCirlce, canvas, properties);
  draw();
}

function draw() {
  reset();

  drawGrid(canvas, properties);
  drawCircle(canvas, properties);
}

function reset() {
  canvas.fillStyle = colors.backgound;
  canvas.fillRect(0, 0, properties.canvasWidth, properties.canvasHeight);
}

init();
