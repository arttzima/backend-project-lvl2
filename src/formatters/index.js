import plain from './plain.js';
import stylish from './stylish.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default chooseFormatter;
