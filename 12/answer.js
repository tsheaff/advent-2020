const _ = require('lodash');
const fileLines = require('../shared/fileLines');

let x = 0; let y = 0;
let facing = 90;

let waypointX = 10;
let waypointY = -1;

const dirDeg = (dirChar) => {
  switch (dirChar) {
    case 'N': return 0;
    case 'E': return 90;
    case 'S': return 180;
    case 'W': return 270;
    default: return 0;
  }
};

const move = (instr) => {
  const dir = instr.charAt(0);
  const numStr = instr.slice(1);
  const num = parseInt(numStr, 10);
  moveBy(dir, num);
};

const turnBy = (nowX, nowY, numDeg) => {
  if (numDeg === 0) { return [nowX, nowY]; }
  const newX = -nowY;
  const newY = nowX;
  return turnBy(newX, newY, numDeg - 90);
};

const moveBy = (dir, num) => {
  console.log('moveBy', dir, num);
  if (dir === 'N') {
    waypointY -= num;
  } else if (dir === 'S') {
    waypointY += num;
  } else if (dir === 'E') {
    waypointX += num;
  } else if (dir === 'W') {
    waypointX -= num;
  } else if (dir === 'F') {
    x += num * waypointX;
    y += num * waypointY;
  } else if (dir === 'L' || dir === 'R') {
    const numDeg = (dir === 'L') ? -num : num;
    const res = turnBy(waypointX, waypointY, numDeg + 360);
    waypointX = res[0];
    waypointY = res[1];
  }
};

console.log('Answer:', Math.abs(x) + Math.abs(y));
