const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
let numbers;

_.forEach(lines, (line) => {
  numbers = line.split(',');
});

let numbersByLastTimeSpoken = {};
let turnIndex = 0;
let lastNumSpoken;
const speak = (num) => {
  lastNumSpoken = num;
  const was = numbersByLastTimeSpoken[num] || {};
  numbersByLastTimeSpoken[num] = {
    numTimes: (was.numTimes || 0) + 1,
    secondToLastTurnIndex: was.lastTurnIndex,
    lastTurnIndex: turnIndex,
  };
  return num;
};

const getNext = () => {
  if (turnIndex < numbers.length) {
    return speak(numbers[turnIndex]);
  }

  const { numTimes, lastTurnIndex, secondToLastTurnIndex } = numbersByLastTimeSpoken[lastNumSpoken];
  if (numTimes === 1) {
    return speak(0);
  }

  return speak(lastTurnIndex - secondToLastTurnIndex);
};

let start = process.hrtime.bigint();
let lastBatchStart = process.hrtime.bigint();
let batchSize = 1000000;
while (true) {
  const num = getNext();
  turnIndex += 1;
  // if (turnIndex === 30000000) {
  if (turnIndex === 30000000) {
    console.log('num is', num);
    break;
  }
  if (turnIndex % batchSize === 0) {
    const size = _.size(numbersByLastTimeSpoken);
    let timeElapsed = process.hrtime.bigint() - start;
    let timeElapsedSinceLastBatch = process.hrtime.bigint() - lastBatchStart;
    lastBatchStart = process.hrtime.bigint();

    console.log('stats: On Turn:', turnIndex);
    console.log('             Size:', size);
    console.log('         Size Per:', (size / turnIndex));
    console.log('         Time Per:', timeElapsed / BigInt(turnIndex));
    console.log('     Time / Batch:', timeElapsedSinceLastBatch / BigInt(batchSize));
    console.log('');
  }
}
