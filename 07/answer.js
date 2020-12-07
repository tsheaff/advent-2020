const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
const dagDown = {};
const dagUp = {};

const addToDag = function (dag, rootColor, color, number) {
  let dagFor = dag[rootColor] || {};
  dagFor[color] = number;
  dag[rootColor] = dagFor;
};

/* Parse the bags into two DAGs */
_.forEach(lines, (line) => {
  const words = line.split(' ');
  const mainColor = _.take(words, 2).join(' ');
  const rules = _.takeRight(words, words.length - 4).join(' ').split(', ');
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
    addToDag(dagDown, mainColor, color, num);
    addToDag(dagUp, color, mainColor, num);
  });
});

/* Part 1, counting the number of distinct colors in the "up" dag */
const getNumColorsUp = function (baseColor, upColors = {}) {
  const forBase = dagUp[baseColor];
  _.forEach(forBase, (num, color) => {
    upColors[color] = true;
    getNumColorsUp(color, upColors);
  });
  return upColors;
};

console.log('Answer 1', _.size(getNumColorsUp('shiny gold')));

/* Part 1, counting the number of total nested bags in the "down" dag */
const getNumBagsDown = function (baseColor, isRoot = true) {
  let numBags = 0;
  const forBase = dagDown[baseColor];
  if (!forBase) { return 1; }
  _.forEach(forBase, (num, color) => {
    numBags += (num * getNumBagsDown(color, false));
  });
  return numBags + (isRoot ? 0 : 1); // don't count yourself if you're the root
};

console.log('Answer 2', getNumBagsDown('shiny gold'));
