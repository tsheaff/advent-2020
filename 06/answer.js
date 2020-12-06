const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
const groups = lines.join('\n').split('\n\n');
let sum = 0;
_.forEach(groups, (group) => {
  const answers = {};
  _.forEach(group, (char) => {
    if (char !== '\n') {
      answers[char] = true;
    }
  });
  sum += _.size(answers);
});
console.log('Answer Part 1 is', sum);

let sumShared = 0;
_.forEach(groups, (group) => {
  const people = _.compact(_.map(group.split('\n'), (person) => {
    return _.size(person) ? [...person] : undefined;
  }));
  const all = _.intersection(...people);
  sumShared += _.size(_.flatten(all));
});
console.log('Anser Part 2', sumShared);
