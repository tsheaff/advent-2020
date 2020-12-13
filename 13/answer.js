const _ = require('lodash');
const math = require('mathjs');
const fileLines = require('../shared/fileLines');

// let earliestTime;
let busIdsAndMinsAfter = [];
const lines = fileLines('./input.txt');
_.forEach(lines, (line, lineIndex) => {
  if (lineIndex === 0) {
    earliestTime = parseInt(line, 10);
    return;
  }
  const all = line.split(',').map((bid) => {
    if (bid === 'x') { return bid; }
    return parseInt(bid, 10);
  });
  _.forEach(all, (bid, index) => {
    busIdsAndMinsAfter.push([bid, index]);
  });
});

const chineseRemainder = (ns, as) => {
  console.log('inside chineseRemainder', ns, as);
  let product = 1;
  _.forEach(ns, (n) => {
    product *= n;
  });

  console.log('product', product);

  let p = 0;
  let sum = 0;

  _.forEach(ns, (n, index) => {
    p = product / n;
    console.log('ai is', as[index]);
    console.log('mulInv is', mulInv(p, n));
    console.log('p is', p);
    sum += as[index] * mulInv(p, n) * p;
    console.log('sum so far is', sum);
  });

  // console.log('smParts is', smParts);
  // console.log('product is', product);

  // const sm = _.sum(_.map(smParts, (smPartsRow) => {
  //   let pSoFar = 1;
  //   _.forEach(smPartsRow, (smElement) => {
  //     pSoFar *= smElement;
  //   });
  //   return pSoFar;
  // }));

  console.log('sum is', sum);
  console.log('product is', product);

  return sum % product;
};

const mulInv = (a, b) => {
  // console.log('mulInv', a, b);
  let aIn = a;
  let bIn = b;
  let b0 = b;
  let x0 = 0;
  let x1 = 1;

  if (bIn === 1) { return 1; }

  while (aIn > 1) {
    let q = Math.floor(aIn / bIn);
    let t = bIn;
    bIn = aIn % bIn;
    aIn = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;

    // console.log('  got (a, b)', aIn, bIn);
    // console.log('  got (x0, x1)', x0, x1);
  }

  if (x1 < 0) { x1 += b0; }

  // console.log(' answer is', x1);
  return x1;
};

console.log('busIdsAndMinsAfter', JSON.stringify(busIdsAndMinsAfter.map((val) => {
  return val[0];
})));

const globalNs = _.compact(_.map(busIdsAndMinsAfter, (val) => {
  if (val[0] === 'x') { return; }
  return val[0];
}));

const globalAs = _.compact(_.map(busIdsAndMinsAfter, (val) => {
  if (val[0] !== 'x') {
    console.log('looking for global a', val);
  }
  if (val[0] === 'x') { return; }
  let answer = val[0] - val[1];
  while (answer < 0) {
    answer += val[0];
  }
  return answer;
}));

console.log('ns', JSON.stringify(globalNs));
console.log('as', JSON.stringify(globalAs));

const x = chineseRemainder(globalNs, globalAs);
console.log('x is', x);

// 3417

// 3 x 17 x 67

// 17 % x === 0
// 13 % x + 2 === 0
// 19 % x + 3 === 0
