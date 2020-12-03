const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');

const toSlope = (xShift, yShift) => {
  let treesHit = 0;
  let x = 0;
  _.forEach(lines, (line, i) => {
    if (i === 0) {
      return;
    }
    if (i % yShift !== 0) {
      return;
    }
    x += xShift;
    const index = x % line.length;
    const char = line.charAt(index);
    // console.log(line);
    // console.log('  x', x, 'index', index, 'length', line.length, 'char', char);
    if (char === '#') {
      treesHit += 1;
    }
  });
  return treesHit;
};

console.log('Answer for 1', toSlope(3, 1));
console.log('Answer for 2', toSlope(1, 1) * toSlope(3, 1) * toSlope(5, 1) * toSlope(7, 1) * toSlope(1, 2));

