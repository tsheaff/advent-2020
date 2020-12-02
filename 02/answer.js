const fs = require('fs');
const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const inputFile = fs.createReadStream('input.txt');
fileLines(inputFile, (err, eachLine) => {
  let numValid = 0;
  _.forEach(eachLine, (line) => {
    if (isLineValidPassword(line)) {
      numValid += 1;
    }
  });
  console.log('numValid is', numValid);
});

function isLineValidPassword(line) {
  const lineParts = line.split(': ');
  const rule = lineParts[0];
  const password = lineParts[1];
  const character = rule.split(' ')[1];
  const minCount = parseInt(rule.split('-')[0], 10);
  const maxCount = parseInt(rule.split('-')[1], 10);

  // return isPasswordValidA(password, character, minCount, maxCount);
  return isPasswordValidB(password, character, minCount, maxCount, line);
}

function isPasswordValidA(password, character, min, max) {
  const count = (password.match(new RegExp(character, 'g')) || []).length;
  const isValid = (count >= min && count <= max);
  console.log(`password \`${password}\` with rule ${character} ${min}-${max} ${isValid ? 'IS' : 'IS NOT'} valid`);
  return isValid;
}

function isPasswordValidB(password, character, pos1, pos2, rawLine) {
  const charAtPos1 = password.charAt(pos1 - 1);
  const charAtPos2 = password.charAt(pos2 - 1);
  const char1Matches = charAtPos1 === character;
  const char2Matches = charAtPos2 === character;
  const isValid = (char1Matches || char2Matches) && !(char1Matches && char2Matches);
  console.log(`\`${password}\` with rule ${character} ${pos1}-${pos2}`);
  console.log(`\`${rawLine}\``);
  console.log(`    valid? ${isValid ? 'YES' : 'NO'}`);
  console.log(`    ${charAtPos1} at ${pos1} matches? ${char1Matches ? 'YES' : 'NO'}`);
  console.log(`    ${charAtPos2} at ${pos2} matches? ${char2Matches ? 'YES' : 'NO'}`);
  return isValid;
}
