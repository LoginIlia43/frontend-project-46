import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import parsers from "../src/parsers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;

const file1Json = filePath('file1.json');
const file1Yaml = filePath('file1.yaml');
const file2Yml = filePath('file2.yml');

const file1Data = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false
  };

const file2Data = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};

test('parse_JSON' , () => {
    expect(parsers(file1Json)).toEqual(file1Data);
});


test('parse_yaml' , () => {
  expect(parsers(file1Yaml)).toEqual(file1Data);
});


test('parse_yml' , () => {
  expect(parsers(file2Yml)).toEqual(file2Data);
});
