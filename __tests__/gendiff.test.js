import gendiff from '../src';

const fs = require('fs');

const first = '__tests__/__fixtures__/before.json';
const second = '__tests__/__fixtures__/after.json';
const expected = fs.readFileSync('__tests__/__fixtures__/expected.md', 'UTF-8');

test('difference test', () => {
  expect(gendiff(first, second)).toEqual(expected);
});
