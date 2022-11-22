import path from 'node:path';

const getPath = (filepath) => path.resolve(`${process.cwd()}`, filepath);

export default getPath;
