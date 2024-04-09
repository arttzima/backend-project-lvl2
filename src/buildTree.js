import _ from 'lodash';

const buildTree = (first, second) => {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  const all = _.sortBy(_.union(firstKeys, secondKeys));
  const deleted = _.difference(firstKeys, secondKeys);
  const added = _.difference(secondKeys, firstKeys);

  const tree = all.flatMap((key) => {
    if (deleted.includes(key)) {
      const value = first[key];
      return {
        type: 'deleted',
        key,
        value,
      };
    }

    if (added.includes(key)) {
      const value = second[key];
      return {
        type: 'added',
        key,
        value,
      };
    }

    const value1 = first[key];
    const value2 = second[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: buildTree(value1, value2),
      };
    }
    if (value1 === value2) {
      return {
        type: 'unchanged',
        key,
        value: value1,
      };
    }
    return {
      type: 'changed',
      key,
      value1,
      value2,
    };
  });

  return tree;
};

export default buildTree;
