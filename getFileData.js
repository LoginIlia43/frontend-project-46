import { readFileSync } from 'node:fs';
import path from 'node:path';

//получаем абсолютный путь из относительного
const getFullPath = filePath => path.resolve(filePath);

//парсим ссылку
const read = filePath => readFileSync(filePath);
const parse = data => JSON.parse(data);

//получаем данные из файла
const getFileData = (filePath) => {
    const fullPath = getFullPath(filePath);
    const fileData = parse(read(fullPath));

    return fileData;
};

export default getFileData;
