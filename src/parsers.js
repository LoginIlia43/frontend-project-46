import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const parsers = (fullPath) => {
  const extension = path.extname(fullPath);
  let parser;

  if ((extension === '.yaml') || (extension === '.yml')) {
    parser = yaml.load;
  } else {
    parser = JSON.parse;
  }

  return parser(readFileSync(fullPath));
};

export default parsers;
