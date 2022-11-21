import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diff, format) => {
  let chosenFormatter;

  if (format === 'stylish') {
    chosenFormatter = stylish;
  } else if (format === 'plain') {
    chosenFormatter = plain;
  } else {
    throw new Error(`unknown format: '${format}'`);
  }

  return chosenFormatter(diff);
};

export default formatter;
