import gendiff from '../src';

const first = '__tests__/__fixtures__/before.json';
const second = '__tests__/__fixtures__/after.json';

const expected = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('difference test', () => {
  expect(gendiff(first, second)).toEqual(expected);
});
