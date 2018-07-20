import fs from 'fs';
import genDiff from '../src';

const pathToFixtures = str => `__tests__/__fixtures__/${str}`;
// JSON
const firstJSONflat = pathToFixtures('before_flat.json');
const secondJSONflat = pathToFixtures('after_flat.json');
const firstJSONdeep = pathToFixtures('before_deep.json');
const secondJSONdeep = pathToFixtures('after_deep.json');
// YAML
const firstYAMLflat = pathToFixtures('before_flat.yml');
const secondYAMLflat = pathToFixtures('after_flat.yml');
const firstYAMLfdeep = pathToFixtures('before_deep.yml');
const secondYAMLdeep = pathToFixtures('after_deep.yaml');
// INI
const firstINIflat = pathToFixtures('before_flat.ini');
const secondINIflat = pathToFixtures('after_flat.ini');
const firstINIdeep = pathToFixtures('before_deep.ini');
const secondINIdeep = pathToFixtures('after_deep.ini');
// result sample
const testFileFlat = pathToFixtures('expected_flat.txt');
const testFileDeep = pathToFixtures('expected_deep.txt');
const testFilePlainFlat = pathToFixtures('expected_plain_flat.txt');
const testFilePlainDeep = pathToFixtures('expected_plain_deep.txt');

describe('difference tests', () => {
  const expectedFlat = fs.readFileSync(testFileFlat, 'UTF-8');
  const expectedDeep = fs.readFileSync(testFileDeep, 'UTF-8');
  const expectedFlatPlain = fs.readFileSync(testFilePlainFlat, 'UTF-8');
  const expectedDeepPlain = fs.readFileSync(testFilePlainDeep, 'UTF-8');

  it('difference test for flat JSON', () => {
    expect(genDiff(firstJSONflat, secondJSONflat)).toEqual(expectedFlat);
  });
  it('difference test for flat JSON with formating', () => {
    expect(genDiff(firstJSONflat, secondJSONflat, 'plain')).toEqual(expectedFlatPlain);
  });

  it('difference test for deep JSON', () => {
    expect(genDiff(firstJSONdeep, secondJSONdeep)).toEqual(expectedDeep);
  });
  it('difference test for deep JSON with formating', () => {
    expect(genDiff(firstJSONdeep, secondJSONdeep, 'plain')).toEqual(expectedDeepPlain);
  });

  it('difference test for flat YAML', () => {
    expect(genDiff(firstYAMLflat, secondYAMLflat)).toEqual(expectedFlat);
  });
  it('difference test for flat YAML with formating', () => {
    expect(genDiff(firstYAMLflat, secondYAMLflat, 'plain')).toEqual(expectedFlatPlain);
  });

  it('difference test for deep YAML', () => {
    expect(genDiff(firstYAMLfdeep, secondYAMLdeep)).toEqual(expectedDeep);
  });
  it('difference test for deep YAML with formating', () => {
    expect(genDiff(firstYAMLfdeep, secondYAMLdeep, 'plain')).toEqual(expectedDeepPlain);
  });

  it('difference test for flat INI', () => {
    expect(genDiff(firstINIflat, secondINIflat)).toEqual(expectedFlat);
  });
  it('difference test for flat INI with formating', () => {
    expect(genDiff(firstINIflat, secondINIflat, 'plain')).toEqual(expectedFlatPlain);
  });

  it('difference test for deep INI', () => {
    expect(genDiff(firstINIdeep, secondINIdeep)).toEqual(expectedDeep);
  });
  it('difference test for deep INI with formating', () => {
    expect(genDiff(firstINIdeep, secondINIdeep, 'plain')).toEqual(expectedDeepPlain);
  });
});
