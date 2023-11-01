import _ from 'lodash';

const compare = (first, second) => {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  const all = _.union(firstKeys, secondKeys).sort();
  const common = _.intersection(firstKeys, secondKeys);
  const onlyInFirst = _.difference(firstKeys, secondKeys);
  const onlyInSecond = _.difference(firstKeys, secondKeys);

  const diff = all.flatMap((key) => {
    if (onlyInFirst.includes(key)) {
      const value = first[key];
      return ` - ${key}: ${value}`;
    }

    if (onlyInSecond.includes(key)) {
      const value = second[key];
      return ` + ${key}: ${value}`;
    }

    if (common.includes(key)) {
      const value1 = first[key];
      const value2 = second[key];
      if (value1 === value2) {
        return `   ${key}: ${value1}`;
      }
      return [` - ${key}: ${value1}`, ` + ${key}: ${value2}`];
    }
  });

  const result = `{\n${diff.join('\n')}\n}`;
  console.log(result);
};

export default compare;
