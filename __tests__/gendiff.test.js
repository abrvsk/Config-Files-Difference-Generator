import fs from 'fs';
import genDiff from '../src';

const pathToFixtures = str => `__tests__/__fixtures__/${str}`;

const firstJSON = pathToFixtures('before.json');
const secondJSON = pathToFixtures('after.json');

const firstYAML = pathToFixtures('before.yml');
const secondYAML = pathToFixtures('after.yml');

const firstINI = pathToFixtures('before.ini');
const secondINI = pathToFixtures('after.ini');

const testFile = pathToFixtures('expected.txt');

test('difference test for flat JSON', () => {
  const expected = fs.readFileSync(testFile, 'UTF-8');
  expect(genDiff(firstJSON, secondJSON)).toEqual(expected);
});

test('difference test for flat YAML', () => {
  const expected = fs.readFileSync(testFile, 'UTF-8');
  expect(genDiff(firstYAML, secondYAML)).toEqual(expected);
});

test('difference test for flat INI', () => {
  const expected = fs.readFileSync(testFile, 'UTF-8');
  expect(genDiff(firstINI, secondINI)).toEqual(expected);
});
