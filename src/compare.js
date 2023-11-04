import _ from 'lodash';

const compare = (first, second) => {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  const all = _.union(firstKeys, secondKeys).sort();
  const common = _.intersection(firstKeys, secondKeys);
  const onlyInFirst = _.difference(firstKeys, secondKeys);
  const onlyInSecond = _.difference(secondKeys, firstKeys);

  const diff = all.flatMap((key) => {
    let item;
    if (onlyInFirst.includes(key)) {
      const value = first[key];
      item = ` - ${key}: ${value}`;
    } else if (onlyInSecond.includes(key)) {
      const value = second[key];
      item = ` + ${key}: ${value}`;
    } else if (common.includes(key)) {
      const value1 = first[key];
      const value2 = second[key];
      if (value1 === value2) {
        item = `   ${key}: ${value1}`;
      } else {
        item = [` - ${key}: ${value1}`, ` + ${key}: ${value2}`];
      }
    }

    return item;
  });

  const result = `{\n${diff.join('\n')}\n}`;
  return result;
};

export default compare;
