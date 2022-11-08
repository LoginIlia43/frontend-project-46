import { readFileSync } from 'node:fs';
import path from 'node:path';

const getCurrentPath = () => process.cwd();
const getAbsolutePath = (filePath) => path.resolve(filePath);
const getFullFilePath = (filePath) => (filePath.startsWith('/') ? getAbsolutePath(getCurrentPath() + filePath) : getAbsolutePath(`${getCurrentPath()}/${filePath}`));

const read = (filePath) => readFileSync(filePath);
const parse = (data) => JSON.parse(data);

const getFileData = (filePath) => parse(read(filePath));

export { getFullFilePath, getFileData };
