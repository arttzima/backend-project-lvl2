import yaml from 'js-yaml';

export default (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml' || '.yaml':
      return yaml.load;
    default:
      return JSON.parse;
  }
};
