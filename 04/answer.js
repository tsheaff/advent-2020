const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt');
let passports = [];
let currentPass = {};
_.forEach(lines, (line, index) => {
  if (line.length === 0) {
    passports.push(currentPass);
    currentPass = {};
    return;
  }

  const kvPairStrs = _.flatten(line.split(' ').map((strs) => {
    return strs.split('\n');
  }));

  _.forEach(kvPairStrs, (kvPairStrs) => {
    const parts = kvPairStrs.split(':');
    currentPass[parts[0]] = parts[1];
  });
});
// passports.push(currentPass);

console.log('num pass', passports.length);
const valids = _.filter(passports, (pass) => {
  // console.log('pass', pass);
  if (!_.has(pass, 'byr')) { console.log('INVALID, missing byr'); return false; }
  const byr = parseInt(pass.byr, 10);
  // console.log('byr', byr);
  if (!(byr >= 1920 && byr <= 2002)) { console.log('INVALID, bad byr', byr); return false; }
  console.log('SUBVALID byr', pass.byr);

  if (!_.has(pass, 'iyr')) { console.log('INVALID, missing iyr'); return false; }
  const iyr = parseInt(pass.iyr, 10);
  // console.log('iyr', iyr);
  if (!(iyr >= 2010 && iyr <= 2020)) { console.log('INVALID, bad iyr', iyr); return false; }
  console.log('SUBVALID iyr', pass.iyr);

  if (!_.has(pass, 'eyr')) { console.log('INVALID, missing eyr'); return false; }
  const eyr = parseInt(pass.eyr, 10);
  // console.log('eyr', eyr);
  if (!(eyr >= 2020 && eyr <= 2030)) { console.log('INVALID, bad eyr', eyr); return false; }
  console.log('SUBVALID eyr', pass.eyr);

  if (!_.has(pass, 'hgt')) { console.log('INVALID, missing hgt'); return false; }
  const hgt = pass.hgt;
  // console.log('hgt', hgt);
  const isCm = _.includes(hgt, 'cm');
  const isIn = _.includes(hgt, 'in');
  if (isCm) {
    const num = parseInt(hgt.split('cm')[0], 10);
    // console.log('isCM', num);
    if (!(num >= 150 && num <= 193)) { console.log('INVALID, bad hgt cm', num); return false; }
  } else if (isIn) {
    const num = parseInt(hgt.split('in')[0], 10);
    // console.log('isIn', num);
    if (!(num >= 59 && num <= 76)) { console.log('INVALID, bad hgt in', num); return false; }
  } else {
    console.log('INVALID, bad hgt no suffix', pass.hgt);
    return false;
  }
  console.log('SUBVALID hgt', pass.hgt);

  if (!_.has(pass, 'hcl')) { console.log('INVALID, missing hcl'); return false; }
  // console.log('hcl?', pass.hcl);
  if (!pass.hcl.match(/#[0-9a-f]{6}/)) {
    console.log('INVALID, bad hcl', pass.hcl);
    return false;
  }
  console.log('SUBVALID hcl', pass.hcl);

  if (!_.has(pass, 'ecl')) { console.log('INVALID, missing ecl'); return false; }
  // console.log('ecl?', pass.ecl);
  if (!pass.ecl.match(/amb|blu|brn|gry|grn|hzl|oth/)) {
    console.log('INVALID, bad ecl', pass.ecl);
    return false;
  }
  console.log('SUBVALID ecl', pass.ecl);

  if (!_.has(pass, 'pid')) { console.log('INVALID, missing pid'); return false; }
  // console.log('pid?', pass.pid);
  if (!pass.pid.match(/\d{9}$/) || pass.pid.length !== 9) {
    console.log('INVALID, bad pid', pass.pid);
    return false;
  }
  console.log('SUBVALID pid', pass.pid);

  console.log('VALID');
  return true;

  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  // hgt (Height) - a number followed by either cm or in:
  //     If cm, the number must be at least 150 and at most 193.
  //     If in, the number must be at least 59 and at most 76.
  // * hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  // cid (Country ID) - ignored, INVALID, missing or not.
});

console.log(valids.length);
