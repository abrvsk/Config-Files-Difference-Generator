const fs = require('fs');
const _ = require('lodash');

const genDiff = (firstConfig, secondConfig) => {
  // parse files to JSON.objects
  const firstContent = JSON.parse(fs.readFileSync(firstConfig, 'UTF-8'));
  const secondContent = JSON.parse(fs.readFileSync(secondConfig, 'UTF-8'));

  const allKeys = _.uniq([...Object.keys(firstContent), ...Object.keys(secondContent)]);

  // build diff string
  const diff = allKeys.reduce((acc, x) => {
    if (!_.has(firstContent, x)) {
      return `${acc}\n  + ${x}: ${secondContent[x]}`;
    }
    if (!_.has(secondContent, x)) {
      return `${acc}\n  - ${x}: ${firstContent[x]}`;
    }
    if (firstContent[x] === secondContent[x]) {
      return `${acc}\n    ${x}: ${firstContent[x]}`;
    }
    return `${acc}\n  - ${x}: ${firstContent[x]}\n  + ${x}: ${secondContent[x]}`;
  }, '');
  return `{${diff}\n}`;
};

export default genDiff;
