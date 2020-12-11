const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const directions = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

const iterate = (seatLayout) => {
  const newLayout = [];
  _.forEach(seatLayout, (row, atY) => {
    const newRow = [];
    _.forEach(row, (char, atX) => {
      if (char === '.') { return; }

      let numOccupied = 0;
      _.forEach(directions, (direction) => {
        let x = atX; let y = atY;
        while (true) {
          x += direction[0]; y += direction[1];
          if (x < 0 || x >= row.length) { break; }
          if (y < 0 || y >= seatLayout.length) { break; }
          const charViewed = seatLayout[y][x];
          if (charViewed === '#') {
            numOccupied += 1;
          }
          if (charViewed !== '.') {
            break;
          }
        }
      });

      const newChar = (() => {
        if (char === 'L' && numOccupied === 0) { return '#'; }
        if (char === '#' && numOccupied >= 5) { return 'L'; }
        return char;
      })();
      newRow.push(newChar);
    });
    newLayout.push(newRow);
  });
  return newLayout;
};

let layout = [];
const lines = fileLines('./input.txt');
_.forEach(lines, (line) => {
  const row = [];
  _.forEach(line, (char) => {
    row.push(char);
  });
  layout.push(row);
});

const countOccupied = (l) => {
  let numO = 0;
  _.forEach(l, (row) => {
    _.forEach(row, (char) => {
      if (char === '#') {
        numO += 1;
      }
    });
  });
  return numO;
};

let i = 0;
let nextLayout;
while (true) {
  nextLayout = iterate(layout);
  if (_.isEqual(nextLayout, layout)) {
    console.log('same again', i);
    console.log('num occupied', countOccupied(nextLayout));
    break;
  }
  layout = nextLayout;
  i += 1;
}
