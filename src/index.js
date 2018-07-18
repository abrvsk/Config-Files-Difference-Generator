import fs from 'fs';
import _ from 'lodash';
import getParser from './parser';

const genDiff = (firstPath, secondPath) => {
  // get file contents
  const content1 = fs.readFileSync(firstPath, 'UTF-8');
  const content2 = fs.readFileSync(secondPath, 'UTF-8');
  // parse files to JSON.objects
  const firstContent = getParser(firstPath)(content1);
  const secondContent = getParser(secondPath)(content2);

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
