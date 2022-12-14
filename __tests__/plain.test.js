import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/getDiff.js';
import plain from '../src/formatters/plain.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/../__fixtures__/${fileName}`;

const file3 = parsers(filePath('file3.json'));
const file4 = parsers(filePath('file4.json'));
const diff = getDiff(file3, file4);

const res = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('plain', () => {
  expect(plain(diff)).toEqual(res);
});
