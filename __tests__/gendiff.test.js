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

describe('difference tests', () => {
  const expected = fs.readFileSync(testFile, 'UTF-8');

  it('difference test for flat JSON', () => {
    expect(genDiff(firstJSON, secondJSON)).toEqual(expected);
  });

  it('difference test for flat YAML', () => {
    expect(genDiff(firstYAML, secondYAML)).toEqual(expected);
  });

  it('difference test for flat INI', () => {
    expect(genDiff(firstINI, secondINI)).toEqual(expected);
  });
});
