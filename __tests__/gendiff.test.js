import fs from 'fs';
import gendiff from '../src';

const firstJSON = '__tests__/__fixtures__/before.json';
const secondJSON = '__tests__/__fixtures__/after.json';
const firstYAML = '__tests__/__fixtures__/before.yml';
const secondYAML = '__tests__/__fixtures__/after.yml';
const expected = fs.readFileSync('__tests__/__fixtures__/expected.md', 'UTF-8');

test('difference test for JSON', () => {
  expect(gendiff(firstJSON, secondJSON)).toEqual(expected);
});

test('difference test for YAML', () => {
  expect(gendiff(firstYAML, secondYAML)).toEqual(expected);
});
