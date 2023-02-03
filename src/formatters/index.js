import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (diff, format) => {
  let chosenFormatter;

  if (format === 'stylish') {
    chosenFormatter = stylish;
  } else if (format === 'plain') {
    chosenFormatter = plain;
  } else if (format === 'json') {
    chosenFormatter = json;
  } else {
    throw new Error(`unknown format: '${format}'`);
  }

  return chosenFormatter(diff) + '\n';
};

export default formatter;
