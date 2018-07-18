import fs from 'fs';
import genDiff from '../src';

const pathBuilder = str => `__tests__/__fixtures__/${str}`;

const firstJSON = pathBuilder('before.json');
const secondJSON = pathBuilder('after.json');

const firstYAML = pathBuilder('before.yml');
const secondYAML = pathBuilder('after.yml');

const firstINI = pathBuilder('before.ini');
const secondINI = pathBuilder('after.ini');

const testFile = pathBuilder('expected.txt');

test('difference test for flat JSON', () => {
  expect(genDiff(firstJSON, secondJSON)).toEqual(fs.readFileSync(testFile, 'UTF-8'));
});

test('difference test for flat YAML', () => {
  expect(genDiff(firstYAML, secondYAML)).toEqual(fs.readFileSync(testFile, 'UTF-8'));
});

test('difference test for flat INI', () => {
  expect(genDiff(firstINI, secondINI)).toEqual(fs.readFileSync(testFile, 'UTF-8'));
});
