const gendiff = require('../src/index');

const first = 'test files/before.json';
const second = 'test files/after.json';

const expected = '{\nhost: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n- follow: false\n}';

test('difference test', () => {
  expect(gendiff(first, second)).toBe(expected);
});
