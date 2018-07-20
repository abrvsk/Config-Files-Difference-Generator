import fs from 'fs';
import genDiff from '../src';

const pathToFixtures = str => `__tests__/__fixtures__/${str}`;

const firstJSONflat = pathToFixtures('before_flat.json');
const secondJSONflat = pathToFixtures('after_flat.json');
const firstJSONdeep = pathToFixtures('before_deep.json');
const secondJSONdeep = pathToFixtures('after_deep.json');

const firstYAMLflat = pathToFixtures('before_flat.yml');
const secondYAMLflat = pathToFixtures('after_flat.yml');

const firstINIflat = pathToFixtures('before_flat.ini');
const secondINIflat = pathToFixtures('after_flat.ini');

const testFileFlat = pathToFixtures('expected_flat.txt');
const testFileDeep = pathToFixtures('expected_deep.txt');

describe('difference tests', () => {
  const expectedFlat = fs.readFileSync(testFileFlat, 'UTF-8');
  const expectedDeep = fs.readFileSync(testFileDeep, 'UTF-8');

  it('difference test for flat JSON', () => {
    expect(genDiff(firstJSONflat, secondJSONflat)).toEqual(expectedFlat);
  });

  it('difference test for deep JSON', () => {
    expect(genDiff(firstJSONdeep, secondJSONdeep)).toEqual(expectedDeep);
  });

  it('difference test for flat YAML', () => {
    expect(genDiff(firstYAMLflat, secondYAMLflat)).toEqual(expectedFlat);
  });

  it('difference test for flat INI', () => {
    expect(genDiff(firstINIflat, secondINIflat)).toEqual(expectedFlat);
  });
});
