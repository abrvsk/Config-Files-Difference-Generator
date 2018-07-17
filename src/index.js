import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';


const genDiff = (firstConfig, secondConfig) => {
  // parse files to JSON.objects
  let firstContent;
  let secondContent;

  if (path.extname(firstConfig) === '.yml') {
    firstContent = yaml.safeLoad(fs.readFileSync(firstConfig, 'utf8'));
    secondContent = yaml.safeLoad(fs.readFileSync(secondConfig, 'utf8'));
  } else {
    firstContent = JSON.parse(fs.readFileSync(firstConfig, 'UTF-8'));
    secondContent = JSON.parse(fs.readFileSync(secondConfig, 'UTF-8'));
  }

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
