function getValueFromBlock(block, variable) {
  return Blockly.JavaScript.valueToCode(block, variable, Blockly.JavaScript.ORDER_NONE) || '0';
}

Blockly.Blocks['turtle_pen'] = {
  /**
   * Block for pen up
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('pen:')
        .appendField(new Blockly.FieldDropdown([
                       ['up', 'Up'],
                       ['down', 'Down']
                     ]),
                     'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_pen'] = function(block) {
  // Generate JavaScript for setting pen up.
  var value = block.getFieldValue('VALUE');
  return 'turtle.pen' + value + '();\n';
};

Blockly.Blocks['turtle_setcolor'] = {
  /**
   * Block for color
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendValueInput('X')
        .setCheck('Number') // validate
        .appendField('setColor');
    this.appendValueInput('Y')
        .setCheck('Number'); // validate
    this.appendValueInput('Z')
        .setCheck('Number'); // validate
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_setcolor'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var value1 = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var value2 = Blockly.JavaScript.valueToCode(block, 'Z',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'turtle.setColor' +
      '(' + value + ', ' + value1 + ', ' + value2 + ');\n';
};

Blockly.Blocks['turtle_move'] = {
  /**
   * Block for moving
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField('move')
        .appendField(new Blockly.FieldDropdown([
                       ['forward', 'forward'],
                       ['backward', 'backward'],
                       ['left', 'left'],
                       ['right', 'right']
                     ]),
                     'DIRECTION');
    this.appendValueInput('VALUE')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_move'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';

  return 'turtle.'+ direction +
      '(' + value + ');\n';
};


Blockly.Blocks['turtle_setheading'] = {
  /**
   * Block for heading
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('setHeading');
    this.appendValueInput('VALUE')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_setheading'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';

  return 'turtle.setHeading' +
      '(' + value + ');\n';
};

Blockly.Blocks['turtle_getheading'] = {
  /**
   * Block for getting heading
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('getHeading');
    this.setOutput(true, 'Number');
  }
};

Blockly.JavaScript['turtle_getheading'] = function(block) {
  return ['turtle.getHeading()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['turtle_define'] = {
  /**
   * Block for definition
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('pos:');
    this.appendValueInput('X')
        .setCheck('Number')
        .appendField('x:')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('y:')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('HEADING')
        .setCheck('Number')
        .appendField('heading:');
  }
};

Blockly.JavaScript['turtle_define'] = function(block) {
  var x = getValueFromBlock(block, 'X');
  var y = getValueFromBlock(block, 'Y');
  var heading = getValueFromBlock(block, 'HEADING');
  var velocity = getValueFromBlock(block, 'VELOCITY');

  return '() => { return {pos: {x: '+ x +', y: ' + y + '}, heading: ' + heading + '}; }';
};
