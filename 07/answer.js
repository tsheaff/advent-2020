const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
const dagDown = {};
const dagUp = {};
_.forEach(lines, (line) => {
  const words = line.split(' ');
  const mainColor = _.take(words, 2).join(' ');
  const containment = _.takeRight(words, words.length - 4).join(' ');
  const rules = containment.split(', ');
  _.forEach(rules, (rule) => {
    if (rule.startsWith('no other bags')) {
      return;
    }
    const ruleParts = rule.split(' ');
    const numPart = ruleParts[0];
    const num = parseInt(numPart, 10);
    if (!num) {
      return;
    }

    const color = _.take(_.takeRight(ruleParts, ruleParts.length - 1), 2).join(' ');
    let dagDownFor = dagDown[mainColor] || {};
    dagDownFor[color] = num;
    dagDown[mainColor] = dagDownFor;

    let dagUpFor = dagUp[color] || {};
    dagUpFor[mainColor] = num;
    dagUp[color] = dagUpFor;
  });
});

const upColors = {};
const getColorsUp = function (baseColor) {
  const forBase = dagUp[baseColor];
  _.forEach(forBase, (num, color) => {
    upColors[color] = true;
    getColorsUp(color);
  });
};

getColorsUp('shiny gold');
console.log('Answer 1', _.size(upColors));

const getNumBagsIn = function (baseColor) {
  let numBags = 0;
  const forBase = dagDown[baseColor];
  if (!forBase) { return 1; }
  _.forEach(forBase, (num, color) => {
    numBags += (num * getNumBagsIn(color));
  });
  return 1 + numBags;
};

console.log('Answer 2', getNumBagsIn('shiny gold') - 1);
