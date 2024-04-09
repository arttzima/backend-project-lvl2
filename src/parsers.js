import yaml from 'js-yaml';

export default (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.load;
    default:
      throw new Error(`Unknown file's format: ${extension}`);
  }
};
