import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/getDiff.js';
import plain from '../src/formatters/plain.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/../__fixtures__/${fileName}`;

const file1 = parsers(filePath('file1.json'));
const file2 = parsers(filePath('file2.json'));
const diff = getDiff(file1, file2);

const res = parsers(filePath('result_plain.txt'));

test('plain', () => {
  expect(plain(diff) + '\n').toEqual(res);
});
