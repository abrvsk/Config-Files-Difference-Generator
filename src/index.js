import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

const parseToJSON = (file) => {
  let result;
  if (path.extname(file) === '.yml') {
    result = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
  } else {
    result = JSON.parse(fs.readFileSync(file, 'UTF-8'));
  }
  return result;
}

const genDiff = (firstConfig, secondConfig) => {
  // parse files to JSON.objects
  const firstContent = parseToJSON(firstConfig);
  const secondContent = parseToJSON(secondConfig);

  const allKeys = _.union(Object.keys(firstContent), Object.keys(secondContent));

  // build diff string
  const diff = allKeys.map((x) => {
    if (!_.has(firstContent, x)) {
      return `  + ${x}: ${secondContent[x]}`;
    }
    if (!_.has(secondContent, x)) {
      return `  - ${x}: ${firstContent[x]}`;
    }
    return (firstContent[x] === secondContent[x])
      ? `    ${x}: ${firstContent[x]}`
      : `  - ${x}: ${firstContent[x]}\n  + ${x}: ${secondContent[x]}`;
  });
  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
