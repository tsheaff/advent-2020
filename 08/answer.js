const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');

const rawInstructions = [];
_.forEach(lines, (line) => {
  const op = line.split(' ')[0];
  const argumentStr = line.split(' ')[1];
  const isPlus = argumentStr.startsWith('+');
  const argumentValue = parseInt(argumentStr.slice(1), 10) * (isPlus ? 1 : -1);
  rawInstructions.push({
    op: op,
    arg: argumentValue,
  });
});

const runInstructions = (instructions) => {
  let instructionIndex = 0;
  let val = 0;
  let visitedIndexes = {};
  while (true) {
    const didLoop = visitedIndexes[instructionIndex];
    if (didLoop) {
      return { finished: false, val: val };
    }

    visitedIndexes[instructionIndex] = true;
    const instruction = instructions[instructionIndex];
    instructionIndex += 1;
    switch (instruction.op) {
      case 'acc':
        val += instruction.arg;
        break;
      case 'jmp':
        instructionIndex += instruction.arg - 1;
        break;
      default:
        break;
    }

    const didFinish = instructionIndex === instructions.length;
    if (didFinish) {
      return { finished: true, val: val };
    }
  }
};

const simpleRun = runInstructions(rawInstructions);
console.log('Answer to part 1 is', simpleRun.val);

_.forEach(rawInstructions, (rawInstruction, index) => {
  if (rawInstruction.op !== 'jmp') {
    return;
  }

  // try setting jmp to nop
  const newInstr = _.cloneDeep(rawInstructions);
  newInstr[index].op = 'nop';

  // now run the instructions
  const { finished, val } = runInstructions(newInstr);

  // if we finished successfully, we're done!
  if (finished) {
    console.log('Answer to part 2 is', val);
    return false;
  }
});

