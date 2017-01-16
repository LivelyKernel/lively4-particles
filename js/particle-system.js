var particles = [];
var stepNumber = 0;
var running = false;
var requestedFrame = 0;

var can = document.getElementById("tCanvas");
can.initialize();
var turtle = can.turtle;
var canvas = can.canvas;
var context = can.context;

function saveSpawnCode()
{
  this.spawnFunction = eval("() => {" + document.getElementById("spawningCode").value + "}")
}

function saveMovementCode()
{
  this.movementFunction = eval("(particle) => {" + document.getElementById("movementCode").value + "}");
}

function clearThis()
{
  var color = document.getElementById("clearColor").value;
  can.clearCanvas(color);
}

function step()
{
  clearThis();
  stepNumber++;

  var startTime = new Date();
  spawn();
  moveAndDraw();
  var endTime = new Date();

  var elapsed = endTime - startTime;
  var partCount = particles.length;

  document.getElementById("info").innerHTML = partCount.toString(10) + " Particles, " + elapsed.toString(10) + "ms";

  if (running)
    requestedFrame = requestAnimationFrame(step);
}

function spawn()
{
  spawnFunction();
}

function moveAndDraw()
{
  newParts = [];
  for (part of particles)
  {
    turtle.setState(part.turtle);
    var keep = movementFunction(part);
    part.turtle = turtle.getState();
    if (keep)
      newParts.push(part);
  }
  particles = newParts;
}

function startSim()
{
  requestedFrame = requestAnimationFrame(step);

  document.getElementById("StepButton").disabled = true;
  document.getElementById("StartButton").disabled = true;
  document.getElementById("PauseButton").disabled = false;

  running = true;
}

function pauseSim()
{
  running = false;
  cancelAnimationFrame(requestedFrame);

  document.getElementById("StepButton").disabled = false;
  document.getElementById("StartButton").disabled = false;
  document.getElementById("PauseButton").disabled = true;
}

function reset()
{
  if (running)
    pauseSim();
  particles = [];
  stepNumber = 0;
  clearThis();
  document.getElementById("info").innerHTML = "(reset)";
}

function init()
{
  saveMovementCode();
  saveSpawnCode();

  var spawner = document.getElementById("spawningCode");
  var mover = document.getElementById("movementCode");

  spawner.changeMode("javascript");
  spawner.customizeEditor();
  spawner.doSave = () => {saveSpawnCode()};

  mover.changeMode("javascript");
  mover.customizeEditor();
  mover.doSave = () => {saveMovementCode()};
};

init();
