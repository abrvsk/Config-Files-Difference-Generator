import fs from 'fs';
import _ from 'lodash';

const genDiff = (firstConfig, secondConfig) => {
  // parse files to JSON.objects
  const firstContent = JSON.parse(fs.readFileSync(firstConfig, 'UTF-8'));
  const secondContent = JSON.parse(fs.readFileSync(secondConfig, 'UTF-8'));

  const allKeys = _.union(Object.keys(firstContent), Object.keys(secondContent));

  // build diff string
  const diff = allKeys.map((x) => {
    if (!_.has(firstContent, x)) {
      return `  + ${x}: ${secondContent[x]}`;
    }
    if (!_.has(secondContent, x)) {
      return `  - ${x}: ${firstContent[x]}`;
    }
    if (firstContent[x] === secondContent[x]) {
      return `    ${x}: ${firstContent[x]}`;
    }
    return `  - ${x}: ${firstContent[x]}\n  + ${x}: ${secondContent[x]}`;
  });
  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
