import _ from 'lodash';

const toStringValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const isZeroLength = (str) => str.length > 0;
const buildKey = (key, acc) => {
  if (isZeroLength(acc)) {
    return `${acc}${key}`;
  }
  return key;
};

const plain = (tree) => {
  const iter = (node, acc) => {
    const result = node.map((item) => {
      const {
        type, key, value, value1, value2,
      } = item;
      switch (type) {
        case 'deleted':
          return `Property '${buildKey(key, acc)}' was removed`;
        case 'added':
          return `Property '${buildKey(key, acc)}' was added with value: ${toStringValue(value)}`;
        case 'changed':
          return `Property '${buildKey(key, acc)}' was updated. From ${toStringValue(value1)} to ${toStringValue(value2)}`;
        case 'unchanged':
          return '';
        case 'nested':
          return iter(item.children, `${acc}${key}.`);
        default:
          throw new Error(`wrong type: ${type}`);
      }
    });
    const filterd = result.filter((item) => item !== '');
    return filterd.join('\n');
  };

  return iter(tree, '');
};

export default plain;
