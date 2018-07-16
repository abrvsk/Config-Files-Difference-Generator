const fs = require('fs');

const genDiff = (firstConfig, secondConfig) => {
  const firstContent = JSON.parse(fs.readFileSync(firstConfig, 'UTF-8'));
  const secondContent = JSON.parse(fs.readFileSync(secondConfig, 'UTF-8'));
  const firstKeys = Object.keys(firstContent);
  const secondKeys = Object.keys(secondContent);
  const allKeys = new Set([...firstKeys, ...secondKeys]);

  return allKeys;
};

export default genDiff;
