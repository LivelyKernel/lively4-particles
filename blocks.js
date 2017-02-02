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
    this.appendValueInput('VALUE')
        .setCheck('Number') // validate
        .appendField('setColor');
    this.appendValueInput('VALUE1')
        .setCheck('Number'); // validate
    this.appendValueInput('VALUE2')
        .setCheck('Number'); // validate
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_setcolor'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var value1 = Blockly.JavaScript.valueToCode(block, 'VALUE1',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var value2 = Blockly.JavaScript.valueToCode(block, 'VALUE2',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'turtle.setColor' +
      '(' + value + ', ' + value1 + ', ' + value2 + ');\n';
};

Blockly.Blocks['math_random'] = {
  /**
   * Block for math random
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField('Math.random()');
    this.setOutput(true, 'Number');
  }
};

Blockly.JavaScript['math_random'] = function(block) {
  // Generate JavaScript for setting math random.
  return 'Math.random()';
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
    this.appendValueInput('VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['turtle_move'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var value = block.getFieldValue('VALUE');

  return 'turtle.'+ direction +
      '(' + value + ');\n';
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
  }
};

Blockly.JavaScript['turtle_define'] = function(block) {
  var x = block.getFieldValue('X');
  var y = block.getFieldValue('Y');

  return '(function() { return {pos: {x: '+ x +', y: ' + y + '}}; })()';
};
