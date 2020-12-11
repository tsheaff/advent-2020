const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const adapters = [];
const lines = fileLines('./input.txt');
_.forEach(lines, (line, lineIndex) => {
  adapters.push(parseInt(line, 10));
});

adapters.push(0);
adapters.push(_.max(adapters) + 3);

let num1 = 0;
let num3 = 0;
const sorted = _.sortBy(adapters);

const diffs = [];
_.forEach(sorted, (n1, i) => {
  if (i + 1 >= sorted.length) {
    return;
  }
  const n2 = sorted[i + 1];
  const diff = n2 - n1;
  diffs.push(diff);
  if (diff === 1) { num1 += 1; }
  if (diff === 3) { num3 += 1; }
});

console.log('Answer to 1 is', num1 * num3);

const splitBy3 = diffs.join(',').split('3,').map((arr1s) => {
  return _.filter(_.compact(arr1s.split(',')), (o) => { return o === '1'; }).length;
});

let product = 1;
_.forEach(splitBy3, (num1s) => {
  if (num1s > 5) {
    console.log('oh no');
    return;
  }
  product *= [1, 1, 2, 4, 7, -1, -1, -1][num1s];
});
console.log('answer to Part 2 is', product);

