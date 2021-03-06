const _ = require('lodash');
const fileLines = require('../shared/fileLines');

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

let mask;
let memory = {};
const lines = fileLines('./input.txt');
_.forEach(lines, (line) => {
  if (_.size(line.split('mask = ')) > 1) {
    mask = line.split('mask = ')[1];
    return;
  }

  const addr = parseInt(line.split('[')[1].split(']')[0], 10);
  const decimal = parseInt(line.split(' = ')[1], 10);
  // const binary = dec2bin(decimal);

  let floatingIndexes = [];
  let maskedAddrBinary = dec2bin(addr).padStart(36, '0');
  _.forEach(mask, (maskChar, index) => {
    if (maskChar !== '0') {
      maskedAddrBinary = maskedAddrBinary.replaceAt(index, maskChar);
    }
    if (maskChar === 'X') {
      floatingIndexes.push(index);
    }
  });

  const allAddresses = _.map(_.range(0, 2 ** floatingIndexes.length), (decimalValue) => {
    let binaryFloats = `${dec2bin(decimalValue)}`.padStart(floatingIndexes.length, '0');
    let address = _.cloneDeep(maskedAddrBinary);
    _.forEach(binaryFloats, (binaryChar, binaryIndex) => {
      address = address.replaceAt(floatingIndexes[binaryIndex], binaryChar);
    });
    return parseInt(address, 2);
  });

  _.forEach(allAddresses, (address) => {
    memory[address] = decimal;
  });
});

console.log('Answer is', _.sum(_.values(memory)));
