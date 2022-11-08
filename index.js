import compareFilesData from './src/compareFilesData.js';
import { getFileData, getFullFilePath } from './src/getFileData.js';

const gendiff = (file1, file2) => {
  const file1Path = getFullFilePath(file1);
  const file2Path = getFullFilePath(file2);
  const data1 = getFileData(file1Path);
  const data2 = getFileData(file2Path);
  const result = compareFilesData(data1, data2);

  return result;
};

export default gendiff;
