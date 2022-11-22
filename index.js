import parsers from './src/parsers.js';
import getPath from './src/getPath.js';
import getDiff from './src/getDiff.js';
import formatter from './src/formatters/index.js';

const gendiff = (file1 = 0, file2 = 0, format = 'stylish') => {
  const file1Path = getPath(file1);
  const file2Path = getPath(file2);
  console.log(process.cwd());
  const data1 = parsers(file1Path);
  const data2 = parsers(file2Path);
  const diff = getDiff(data1, data2);

  return formatter(diff, format);
};

export default gendiff;
