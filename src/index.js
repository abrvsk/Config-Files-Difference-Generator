const fs = require('fs');
const _ = require('lodash');

const genDiff = (firstConfig, secondConfig) => {
  const firstContent = JSON.parse(fs.readFileSync(firstConfig, 'UTF-8'));
  const secondContent = JSON.parse(fs.readFileSync(secondConfig, 'UTF-8'));
  const allKeys = _.uniq([...Object.keys(firstContent), ...Object.keys(secondContent)]);

  return allKeys;
};

export default genDiff;
