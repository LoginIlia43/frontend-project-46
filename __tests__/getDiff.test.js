import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import parsers from '../src/parsers.js';
import getDiff from '../src/getDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/../__fixtures__/${fileName}`;

const file3Json = parsers(filePath('file3.json'));
const file4Json = parsers(filePath('file4.json'));
const file3Yaml = parsers(filePath('file3.yaml'));
const file4Yml = parsers(filePath('file4.yml'));

const expectedResult = '[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value1":"Value 1"},{"key":"setting2","type":"deleted","value":200},{"key":"setting3","type":"updated","value1":true,"value2":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"updated","value1":"","value2":"so much"}]},{"key":"key","type":"unchanged","value1":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"updated","value1":"bas","value2":"bars"},{"key":"foo","type":"unchanged","value1":"bar"},{"key":"nest","type":"updated","value1":{"key":"value"},"value2":"str"}]},{"key":"group2","type":"deleted","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('compare_json', () => {
  const result = getDiff(file3Json, file4Json);
  expect(JSON.stringify(result)).toBe(expectedResult);
});

test('compare_yaml', () => {
  const result = getDiff(file3Yaml, file4Yml);
  expect(JSON.stringify(result)).toBe(expectedResult);
});

test('compare_json_yaml', () => {
  const result = getDiff(file3Json, file4Yml);
  expect(JSON.stringify(result)).toBe(expectedResult);
});
