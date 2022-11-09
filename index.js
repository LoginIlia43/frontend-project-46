import compareFilesData from './src/compareFilesData.js';
import parsers from './src/parsers.js';
import { getFullFilePath } from './src/getFileData';

const gendiff = (file1, file2) => {
  const file1Path = getFullFilePath(file1);
  const file2Path = getFullFilePath(file2);
  const data1 = parsers(file1Path);
  const data2 = parsers(file2Path);
  const result = compareFilesData(data1, data2);

  return result;
};

export default gendiff;
