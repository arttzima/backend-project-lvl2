import path from 'node:path';
import { readFileSync } from 'node:fs';
import getParser from './src/parsers.js';
import buildTree from './src/buildTree.js';
import chooseFormatter from './src/formatters/index.js';

export default (path1, path2, formatName = 'stylish') => {
  const filepath1 = path.resolve(path1);
  const filepath2 = path.resolve(path2);

  const ext = path.extname(filepath1);
  const parser = getParser(ext);
  const formatter = chooseFormatter(formatName);

  const file1 = readFileSync(filepath1, 'utf-8');
  const file2 = readFileSync(filepath2, 'utf-8');

  const obj1 = parser(file1);
  const obj2 = parser(file2);

  const tree = buildTree(obj1, obj2);
  const diff = formatter(tree);
  return diff;
};
