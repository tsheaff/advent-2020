const _ = require('lodash');
const fileLines = require('../shared/fileLines');

const lines = fileLines('./input.txt').join('\n');
const parts = lines.split('\n\n');
// console.log('parts', parts);
const rules = parts[0].split('\n').map((rulestr) => {
  console.log('rulestr', rulestr);
  const ruleName = rulestr.split(': ')[0];
  const ranges = rulestr.split(': ')[1].split(' or ').map((rangeStr) => {
    return rangeStr.split('-').map((numStr) => { return parseInt(numStr, 10); });
  });
  return {
    name: ruleName,
    ranges: ranges,
  };
});

console.log('rules', JSON.stringify(rules));

const yourTicket = parts[1].split('your ticket:\n')[1].split(',').map((numStr) => {
  return parseInt(numStr, 10);
});

const nearbyTickets = parts[2].split('nearby tickets:\n')[1].split('\n').map((ticketStr) => {
  return ticketStr.split(',').map((numStr) => {
    return parseInt(numStr, 10);
  });
});

const allTickets = [yourTicket, ...nearbyTickets];
// console.log('allTickets', allTickets);

const isValidField = (ticketNum) => {
  const ruleMath = _.find(rules, (rule) => {
    const { ranges } = rule;
    return _.find(ranges, (range) => {
      return ticketNum >= range[0] && ticketNum <= range[1];
    });
  });
  return !!ruleMath;
};

const ticketsWithAnyValid = _.filter(allTickets, (t) => {
  const firstInvalid = _.find(t, (n) => {
    return !isValidField(n);
  });
  return !firstInvalid;
});

console.log('ticketsWithAnyValid', ticketsWithAnyValid);

let indexesToRuleOptions = [];
_.forEach(yourTicket, (ticketNum, index) => {
  const allNumbers = _.map(ticketsWithAnyValid, (t) => {
    return t[index];
  });
  console.log('allNumbers', index, allNumbers);
  const rulesMatchingAll = _.filter(rules, (rule) => {
    const firstInvalid = _.find(allNumbers, (n) => {
      const { ranges } = rule;
      const isValid = _.find(ranges, (range) => {
        return n >= range[0] && n <= range[1];
      });
      if (!isValid) {
        console.log('   invalid', n, 'for rule', JSON.stringify(rule));
      }
      return !isValid;
    });
    return !firstInvalid;
  });
  indexesToRuleOptions.push(rulesMatchingAll);
});
console.log('indexesToRuleOptions', indexesToRuleOptions);

const rulesByIndex = {};
const takenRuleNames = [];
let foo = 0;
let numLastChosen;
let tolerance = 1;
const pick = (i, rule) => {
  if (rulesByIndex[i]) {
    return;
  }
  console.log('pick', i, 'rule', rule.name);
  rulesByIndex[i] = rule;
  takenRuleNames.push(rule.name);
};

while (true) {
  const takenIndexes = _.map(_.keys(rulesByIndex), (k) => { return parseInt(k, 10); });
  const untakenIndexes = _.shuffle(_.difference(_.range(_.size(rules)), takenIndexes));
  _.forEach(untakenIndexes, (i) => {
    const options = indexesToRuleOptions[i].filter((o) => {
      return !_.includes(takenRuleNames, o.name) && !rulesByIndex[i];
    });
    if (foo === 25) {
      console.log('options', i, options, 'with taken', takenRuleNames);
    }
    if (options.length <= tolerance && options.length > 0) {
      pick(i, options[0]);
    }
  });

  if (_.size(rulesByIndex) === _.size(indexesToRuleOptions)) {
    break;
  }
  if (foo > 25) {
    break;
  }
  foo++;
  let numChosen = _.size(rulesByIndex);
  if (numChosen === numLastChosen) {
    tolerance++;
  }
  numLastChosen = numChosen;
  console.log('after', foo, 'runs', _.size(rulesByIndex), 'rules chosen', tolerance);
}

const takenIndexes = _.map(_.keys(rulesByIndex), (k) => { return parseInt(k, 10); });
const untakenIndexes = _.difference(_.range(_.size(rules)), takenIndexes);

if (_.size(untakenIndexes) === 0) {
  let answer = 1;
  _.forEach(rulesByIndex, (rule, index) => {
    if (rule.name.startsWith('departure')) {
      answer *= yourTicket[index];
    }
  });
  console.log('answer is', answer);
}
