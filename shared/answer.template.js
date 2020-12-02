const _ = require('lodash');
// eslint-disable-next-line
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
_.forEach(lines, (line, index) => {
  console.log(`Line ${index}: ${line}`);
});
