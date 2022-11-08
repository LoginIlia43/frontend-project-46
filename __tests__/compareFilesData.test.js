import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compareFilesData from '../src/compareFilesData.js';
import { getFullFilePath, getFileData } from '../src/getFileData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;

const file1 = getFileData(filePath('file1.json'));
const file2 = getFileData(filePath('file2.json'));

test('test1', () => {
  expect(compareFilesData(file1, file2)).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});
