import _ from 'lodash';

const INDENT = 4;
const BACKINDENT = 2;
const GAP = ' ';

const toStringValue = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const indentSize = INDENT * depth;
  const keyIndent = GAP.repeat(indentSize);
  const bracketIndent = GAP.repeat(indentSize - INDENT);
  const entries = Object.entries(obj);
  const line = entries.map(([key, value]) => `${keyIndent}${key}: ${toStringValue(value, depth + 1)}`);

  const result = ['{', ...line, `${bracketIndent}}`].join('\n');

  return result;
};

const buildTree = (tree) => {
  const iter = (node, depth) => {
    const indentSize = INDENT * depth;
    const indentSizeForKey = indentSize - BACKINDENT;
    const indentSizeForBracket = indentSize - INDENT;
    const keyIndent = GAP.repeat(indentSizeForKey);
    const line = node.flatMap((item) => {
      const { type } = item;
      const { key, value } = item;
      const { value1, value2 } = item;
      const { children } = item;
      switch (type) {
        case 'deleted':
          return `${keyIndent}- ${key}: ${toStringValue(value, depth + 1)}`;
        case 'added':
          return `${keyIndent}+ ${key}: ${toStringValue(value, depth + 1)}`;
        case 'dontchanged':
          return `${keyIndent}  ${key}: ${toStringValue(value, depth + 1)}`;
        case 'changed':
          return [`${keyIndent}- ${key}: ${toStringValue(value1, depth + 1)}`, `${keyIndent}+ ${key}: ${toStringValue(value2, depth + 1)}`];
        case 'nested':
          return `${keyIndent}  ${key}: ${iter(children, depth + 1)}`;
        default:
          return 'wrong value';
      }
    });

    const result = ['{', ...line, `${GAP.repeat(indentSizeForBracket)}}`].join('\n');

    return result;
  };
  return iter(tree, 1);
};

export default buildTree;
