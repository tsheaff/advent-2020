const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
let maxSeatId = 0;
let allSeats = {};
_.forEach(lines, (line) => {
  let range = 128;
  let row = 0;
  let seat = 0;
  let rowShift = range / 2;
  let seatShift = 4;
  _.forEach(line, (char, index) => {
    if (index < 7) {
      if (char === 'B') { row += rowShift; }
      rowShift /= 2;
      return;
    }
    if (char === 'R') { seat += seatShift; }
    seatShift /= 2;
  });
  const seatId = 8 * row + seat;
  allSeats[seatId] = true;
  if (seatId > maxSeatId) {
    maxSeatId = seatId;
  }
});

console.log('Answer 1 is', maxSeatId);

_.forEach(_.range(maxSeatId + 1), (seatId) => {
  if (!allSeats[seatId.toString()] && allSeats[(seatId - 1).toString()] && allSeats[(seatId + 1).toString()]) {
    console.log('Answer 2 is', seatId);
  }
});

