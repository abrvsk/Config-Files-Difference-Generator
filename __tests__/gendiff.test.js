import fs from 'fs';
import genDiff from '../src';

const pathBuilder = (str) => {
  const pathToFile = '__tests__/__fixtures__/';
  if (str === '.md') return `${path}expected${str}`;
  return [`${path}before${str}`, `${path}after${str}`];
};

const firstJSON = pathBuilder('.json');
// const secondJSON = pathBuilder('after.json');

const firstYAML = pathBuilder('.yml');
// const secondYAML = pathBuilder('after.yml');

const firstINI = pathBuilder('.ini');
// const secondINI = pathBuilder('after.ini');

const testFile = pathBuilder('.md');

const expected = fs.readFileSync(testFile, 'UTF-8');

test('difference test for JSON', () => {
  expect(genDiff(...firstJSON)).toEqual(expected);
});

test('difference test for YAML', () => {
  expect(genDiff(...firstYAML)).toEqual(expected);
});

test('difference test for INI', () => {
  expect(genDiff(...firstINI)).toEqual(expected);
});
