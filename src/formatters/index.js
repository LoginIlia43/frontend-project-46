import stylish from './src/formatters/stylish.js';
import plain from './plain.js';

const formatter = (format) => {
  let chosenFormatter;

  if (format === 'stylish') {
    chosenFormatter = stylish;
  }
  if (format === 'plain') {
    chosenFormatter = plain;
  } else {
    throw new Error (`unknown format: '${format}'`);
  }

  return chosenFormatter;
};
