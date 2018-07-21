import path from 'path';
import fs from 'fs';
import buildAST from './buildAST';
import getRenderer from './renderers';
import getParser from './parser';


const genDiff = (firstPath, secondPath, format = 'standard') => {
  // parse files to JSON.objects
  const ext = path.extname(firstPath);
  const parseToObject = getParser(ext);

  const firstContent = fs.readFileSync(firstPath, 'UTF-8');
  const secondContent = fs.readFileSync(secondPath, 'UTF-8');

  const first = parseToObject(firstContent);
  const second = parseToObject(secondContent);

  const diff = buildAST(first, second);
  const render = getRenderer(format);

  return render(diff);
};

export default genDiff;
