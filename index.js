import parsers from './src/parsers.js';
import { getFullFilePath } from './src/getFileData.js';
import getDiff from './src/getDiff.js';
import formatter from './src/formatters/index.js';

const gendiff = (file1, file2, format = 'stylish') => {
  const file1Path = getFullFilePath(file1);
  const file2Path = getFullFilePath(file2);
  const data1 = parsers(file1Path);
  const data2 = parsers(file2Path);
  const diff = getDiff(data1, data2);

  return formatter(diff, format);
};

export default gendiff;
