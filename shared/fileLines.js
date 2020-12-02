const fs = require('fs');

module.exports = function (inputFileName) {
  const data = fs.readFileSync(inputFileName, 'UTF-8');
  return data.split(/\r?\n/);
};
