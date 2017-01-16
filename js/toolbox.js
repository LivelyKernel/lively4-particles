// workspace
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox')});

// canvas
var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
// var can = document.getElementById("tCanvas");
// can.initialize();
// var turtle = can.turtle;
// var canvas = can.canvas;
// var context = can.context;

// update code
Blockly.JavaScript.addReservedWords('code');
var code;
function myUpdateFunction(event) {
  code = Blockly.JavaScript.workspaceToCode(workspace);
}
workspace.addChangeListener(myUpdateFunction);

// button on click
var positionX = 100, positionY = 150, rotation = 0;
document.getElementById('runBtn').onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  positionX = 100, positionY = 150, rotation = 0;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

function move(distance) {
  context.beginPath();
  context.moveTo(positionX, positionY);
  angle = (rotation % 360) * Math.PI / 180;
  positionX += distance * Math.cos(angle);
  positionY += distance * Math.sin(angle)
  context.lineTo(positionX, positionY);
  context.stroke();
}

function rotate(newRotation) {
  rotation += newRotation;
}

function blockToCode(functionName, block) {
  // Generate JavaScript.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return functionName +
      '(' + value + ');\n';
}

// custom buttons
Blockly.Blocks['turtle_penup'] = {
  /**
   * Block for pen up
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('penUp');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_penup'] = function(block) {
  // Generate JavaScript for setting pen up.
  return 'turtle.penUp();\n';
};

Blockly.Blocks['turtle_move'] = {
  /**
   * Block for moving forward or backwards.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField('move');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.JavaScript['turtle_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  return blockToCode('move', block);
  //return blockToCode('turtle.forward', block);
};

Blockly.Blocks['turtle_rotate'] = {
  /**
   * Block for moving forward or backwards.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField('rotate');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.JavaScript['turtle_rotate'] = function(block) {
  // Generate JavaScript for rotating.
  return blockToCode('rotate', block);
};
