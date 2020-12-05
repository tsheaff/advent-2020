const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
let allSeats = {};
_.forEach(lines, (line) => {
  let rowShift = 128;
  let seatShift = 8;
  let row = 0;
  let seat = 0;

  _.forEach(line, (char, index) => {
    if (index < 7) {
      rowShift /= 2;
      if (char === 'B') { row += rowShift; }
      return;
    }
    seatShift /= 2;
    if (char === 'R') { seat += seatShift; }
  });
  const seatId = 8 * row + seat;
  allSeats[seatId] = true;
});

const maxSeatId = _.max(_.map(_.keys(allSeats), (str) => parseInt(str, 10)));
console.log('Answer 1 is', maxSeatId);

_.forEach(_.range(maxSeatId + 1), (seatId) => {
  if (
    !allSeats[seatId]
    && allSeats[(seatId - 1)]
    && allSeats[(seatId + 1)]
  ) {
    console.log('Answer 2 is', seatId);
  }
});

