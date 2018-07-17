import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseToJSON = (file) => {
  const parser = {
    '.ini': arg => ini.parse(fs.readFileSync(arg, 'UTF-8')),
    '.json': arg => JSON.parse(fs.readFileSync(arg, 'UTF-8')),
    '.yml': arg => yaml.safeLoad(fs.readFileSync(arg, 'utf8')),
  };
  const extension = path.extname(file);
  return parser[extension](file);
};

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
    if (firstContent[x] === secondContent[x]) {
      return `    ${x}: ${firstContent[x]}`;
    }
    return `  - ${x}: ${firstContent[x]}\n  + ${x}: ${secondContent[x]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
