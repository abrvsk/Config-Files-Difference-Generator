import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parsers from './parser';

const parseToObject = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'UTF-8');
  const fileExt = path.extname(filePath);
  return parsers[fileExt](fileContent);
};

const genDiff = (firstPath, secondPath) => {
  // parse files to JSON.objects
  const firstContent = parseToObject(firstPath);
  const secondContent = parseToObject(secondPath);

  const allKeys = _.union(Object.keys(firstContent), Object.keys(secondContent));

  // build diff string
  const diff = allKeys.map((value) => {
    if (!_.has(firstContent, value)) {
      return `  + ${value}: ${secondContent[value]}`;
    }
    if (!_.has(secondContent, value)) {
      return `  - ${value}: ${firstContent[value]}`;
    }
    if (firstContent[value] === secondContent[value]) {
      return `    ${value}: ${firstContent[value]}`;
    }
    return `  - ${value}: ${firstContent[value]}\n  + ${value}: ${secondContent[value]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
