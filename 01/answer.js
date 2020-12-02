const fs = require('fs');
const _ = require('lodash');

function readLines(input, callback) {
  const numbers = [];
  let remaining = '';

  input.on('data', (data) => {
    remaining += data;
    let index = remaining.indexOf('\n');
    while (index > -1) {
      const line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      const number = parseInt(line, 10);
      numbers.push(number);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', () => {
    return callback(null, numbers);
  });
}

const input = fs.createReadStream('numbers.txt');
readLines(input, (err, numbers) => {
  _.forEach(numbers, (n1) => {
    _.forEach(numbers, (n2) => {
      _.forEach(numbers, (n3) => {
        if (n1 + n2 + n3 === 2020) {
          console.log('n1 is', n1);
          console.log('n2 is', n2);
          console.log('n3 is', n3);
          console.log('answer is', n1 * n2 * n3);
        }
      });
    });
  });
});
