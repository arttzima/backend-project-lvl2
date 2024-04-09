import plain from './plain.js';
import stylish from './stylish.js';
import toJson from './toJson.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return toJson;
    default:
      throw new Error(`Unexpected format: ${format}`);
  }
};

export default chooseFormatter;
