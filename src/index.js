import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getParser = {
  '.ini': ini.parse,
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const genDiff = (firstConfig, secondConfig) => {
  // get file contents
  const file1 = fs.readFileSync(firstConfig, 'UTF-8');
  const file2 = fs.readFileSync(secondConfig, 'UTF-8');

  // get file extensions
  const firstExt = path.extname(firstConfig);
  const secondExt = path.extname(secondConfig);

  // parse files to JSON.objects
  const firstContent = getParser[firstExt](file1);
  const secondContent = getParser[secondExt](file2);

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
