import gendiff from '../src';

const first = 'test files/before.json';
const second = 'test files/after.json';

/* const expected = '{\nhost: hexlet.io\n+ timeout: 20
  \n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n- follow: false\n}'; */

const expected = ['host', 'timeout', 'proxy', 'follow', 'verbose'];

test('difference test', () => {
  expect(gendiff(first, second)).toEqual(expected);
});
