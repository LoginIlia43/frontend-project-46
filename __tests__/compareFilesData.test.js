import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compareFilesData from '../src/compareFilesData.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;

const file1Json = parsers(filePath('file1.json'));
const file2Json = parsers(filePath('file2.json'));
const file1Yaml = parsers(filePath('file1.yaml'));
const file2Yml = parsers(filePath('file2.yml'));

test('compare_json', () => {
  expect(compareFilesData(file1Json, file2Json)).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});

test('compare_yaml_yml', () => {
  expect(compareFilesData(file1Yaml, file2Yml)).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});
