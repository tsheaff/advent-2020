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
    // console.log('instructionIndex', instructionIndex);
    // console.log('visitedIndexes', visitedIndexes);
    if (visitedIndexes[instructionIndex]) {
      return { s: false, val: val };
    }

    visitedIndexes[instructionIndex] = true;
    const instruction = instructions[instructionIndex];
    // console.log('instruction', instruction);
    if (instruction.op === 'acc') {
      val += instruction.arg;
      instructionIndex += 1;
    } else if (instruction.op === 'jmp') {
      instructionIndex += instruction.arg;
    } else {
      instructionIndex += 1;
    }

    if (instructionIndex === instructions.length) {
      return { s: true, val: val };
    }
  }
};

const simpleRun = runInstructions(rawInstructions);
console.log('Answer to part 1 is', simpleRun.val);

_.forEach(rawInstructions, (rawInstruction, index) => {
  if (rawInstruction.op === 'jmp') {
    const newInstr = _.cloneDeep(rawInstructions);
    newInstr[index].op = 'nop';
    const { s, val } = runInstructions(newInstr);
    if (s) {
      console.log('Answer to part 2 is', val);
      return false;
    }
  }
});

