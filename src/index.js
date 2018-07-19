import path from 'path';
import fs from 'fs';
import parsers from './parser';
import buildAST from './buildAST';
import render from './render';

const parseToObject = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'UTF-8');
  const fileExt = path.extname(filePath);
  return parsers[fileExt](fileContent);
};

const genDiff = (firstPath, secondPath) => {
  // parse files to JSON.objects
  const firstContent = parseToObject(firstPath);
  const secondContent = parseToObject(secondPath);

  const diff = buildAST(firstContent, secondContent);

  return render(diff);
};

export default genDiff;
