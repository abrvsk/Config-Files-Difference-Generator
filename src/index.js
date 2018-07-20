import path from 'path';
import fs from 'fs';
import buildAST from './buildAST';
import getRenderer from './renderers/getRenderer';
import parsers from './parser';


const parseToObject = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'UTF-8');
  const fileExt = path.extname(filePath);
  const parse = parsers[fileExt];
  return parse(fileContent);
};

const genDiff = (firstPath, secondPath, format = 'standard') => {
  // parse files to JSON.objects
  const firstContent = parseToObject(firstPath);
  const secondContent = parseToObject(secondPath);

  const diff = buildAST(firstContent, secondContent);
  const render = getRenderer[format];

  return render(diff);
};

export default genDiff;
