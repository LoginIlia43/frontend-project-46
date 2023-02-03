import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const parsers = (fullPath) => {
  const extension = path.extname(fullPath);

  if ((extension === '.yaml') || (extension === '.yml')) {
    return yaml.load(readFileSync(fullPath));
  }
  if (extension === '.json') {
    return JSON.parse(readFileSync(fullPath));
  }
  if (extension === '.txt') {
    return readFileSync(fullPath, 'utf-8');
  }
  return new Error('Unknown extension');
};

export default parsers;
