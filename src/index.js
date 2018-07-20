import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import buildAST from './buildAST';
import standardRender from './renderers/standard';
import plainRender from './renderers/plain';

const parsers = {
  '.ini': ini.parse,
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

const parseToObject = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'UTF-8');
  const fileExt = path.extname(filePath);
  return parsers[fileExt](fileContent);
};

const genDiff = (firstPath, secondPath, format) => {
  // parse files to JSON.objects
  const firstContent = parseToObject(firstPath);
  const secondContent = parseToObject(secondPath);

  const diff = buildAST(firstContent, secondContent);

  return format === 'plain' ? plainRender(diff) : `{\n${standardRender(diff)}\n}`;
};

export default genDiff;
