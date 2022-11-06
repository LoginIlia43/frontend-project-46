import { readFileSync } from 'node:fs';
import path from 'node:path';

const getCurrentPath = () => process.cwd();
const getAbsolutePath = filePath => path.resolve(filePath);

//парсим ссылку
const read = filePath => readFileSync(filePath);
const parse = data => JSON.parse(data);

//получаем данные из файла
const getFileData = (filePath) => {
    const currentPath = getCurrentPath();
    let fullFilePath = '';

    filePath.startsWith('/') ? fullFilePath = getAbsolutePath(currentPath + filePath) : fullFilePath = getAbsolutePath(currentPath + '/' + filePath);
    const fileData = parse(read(fullFilePath));

    return fileData;
};

export default getFileData;
