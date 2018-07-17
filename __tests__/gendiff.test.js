import fs from 'fs';
import { genDiff, pathBuilder } from '../src';

const firstJSON = pathBuilder('before.json');
const secondJSON = pathBuilder('after.json');

const firstYAML = pathBuilder('before.yml');
const secondYAML = pathBuilder('after.yml');

const firstINI = pathBuilder('before.ini');
const secondINI = pathBuilder('after.ini');

const testFile = pathBuilder('expected.md');

const expected = fs.readFileSync(testFile, 'UTF-8');

test('difference test for JSON', () => {
  expect(genDiff(firstJSON, secondJSON)).toEqual(expected);
});

test('difference test for YAML', () => {
  expect(genDiff(firstYAML, secondYAML)).toEqual(expected);
});

test('difference test for INI', () => {
  expect(genDiff(firstINI, secondINI)).toEqual(expected);
});
