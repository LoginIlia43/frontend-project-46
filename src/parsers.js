import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const parsers = (fullPath) => {
  const extension = path.extname(fullPath);
  let parser;

  if ((extension === '.yaml') || (extension === '.yml')) {
    parser = yaml.load;
  }
  if (extension === '.json') {
    parser = JSON.parse;
  } 
  if (extension === '.txt') {
    return readFileSync(fullPath, 'utf-8');
  }

  return parser(readFileSync(fullPath));
};

export default parsers;
