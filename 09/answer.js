const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lookback = 25;
const numbers = [];
const lines = fileLines('./input.txt');
_.forEach(lines, (line) => {
  numbers.push(parseInt(_.trim(line), 10));
});

let part1Answer;
_.forEach(numbers, (number, index) => {
  if (index < lookback) {
    return;
  }

  const numbersSinceLookback = _.cloneDeep(numbers).slice(index - lookback, index);
  for (const n1 of numbersSinceLookback) {
    for (const n2 of numbersSinceLookback) {
      if (n1 + n2 === number && n1 !== n2) {
        return;
      }
    }
  }

  part1Answer = number;
  console.log('Answer 1', part1Answer);
  return false;
});

const sumBetween = (s, e) => {
  return _.sum(numbers.slice(s, e + 1));
};

const tryToFindSumFromIndex = (startIndex) => {
  let endIndex = startIndex + 1;
  while (true) {
    if (endIndex >= numbers.length) {
      return;
    }
    const sum = sumBetween(startIndex, endIndex);
    if (sum === part1Answer) {
      const rangeThatSums = numbers.slice(startIndex, endIndex + 1);
      console.log('Answer 2 is', _.max(rangeThatSums) + _.min(rangeThatSums));
      return;
    }
    if (sum > part1Answer) {
      return;
    }
    endIndex += 1;
  }
};

_.forEach(numbers, (n, i) => {
  tryToFindSumFromIndex(i);
});
