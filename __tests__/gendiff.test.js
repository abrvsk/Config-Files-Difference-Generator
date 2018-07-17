import fs from 'fs';
import genDiff from '../src';

const pathBuilder = (str) => {
  const pathToFile = '__tests__/__fixtures__/';
  if (str === '.md') return `${pathToFile}expected${str}`;
  return [`${pathToFile}before${str}`, `${pathToFile}after${str}`];
};

const testJSON = pathBuilder('.json');
const testYAML = pathBuilder('.yml');
const testINI = pathBuilder('.ini');

const testFile = pathBuilder('.md');

const expected = fs.readFileSync(testFile, 'UTF-8');

test('difference test for JSON', () => {
  expect(genDiff(...testJSON)).toEqual(expected);
});

test('difference test for YAML', () => {
  expect(genDiff(...testYAML)).toEqual(expected);
});

test('difference test for INI', () => {
  expect(genDiff(...testINI)).toEqual(expected);
});
