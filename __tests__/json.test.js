import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/getDiff.js';
import parsers from '../src/parsers.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/../__fixtures__/${fileName}`;

const file1 = parsers(filePath('file1.json'));
const file2 = parsers(filePath('file2.json'));
const diff = getDiff(file1, file2);

const expectedResult = `[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value1":"Value 1"},{"key":"setting2","type":"deleted","value":200},{"key":"setting3","type":"updated","value1":true,"value2":{"key":"value"}},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"updated","value1":"too much","value2":"so much"}]},{"key":"key","type":"unchanged","value1":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"updated","value1":"bas","value2":"bars"},{"key":"foo","type":"unchanged","value1":"bar"},{"key":"nest","type":"updated","value1":{"key":"value"},"value2":"str"}]},{"key":"group2","type":"deleted","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}},{"key":"group4","type":"nested","children":[{"key":"default","type":"updated","value1":null,"value2":""},{"key":"foo","type":"updated","value1":0,"value2":null},{"key":"isNested","type":"updated","value1":false,"value2":"none"},{"key":"key","type":"added","value":false},{"key":"nest","type":"nested","children":[{"key":"bar","type":"updated","value1":"","value2":0},{"key":"isNested","type":"deleted","value":true}]},{"key":"someKey","type":"added","value":true},{"key":"type","type":"updated","value1":"bas","value2":"bar"}]},{"key":"language","type":"unchanged","value1":"js"}]`;

test('json', () => {
  expect(json(diff)).toEqual(expectedResult);
});
