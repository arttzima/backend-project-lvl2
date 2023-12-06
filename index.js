import path from 'node:path';
import { readFileSync } from 'node:fs';
import getParser from './src/parsers.js';
import buildTree from './src/buildTree.js';
import buildDiff from './src/stylish.js';

export default (path1, path2) => {
  const filepath1 = path.resolve(path1);
  const filepath2 = path.resolve(path2);

  const ext = path.extname(filepath1);
  const parser = getParser(ext);

  const file1 = readFileSync(filepath1, 'utf-8');
  const file2 = readFileSync(filepath2, 'utf-8');

  const o1 = parser(file1);
  const o2 = parser(file2);

  const tree = buildTree(o1, o2);
  const diff = buildDiff(tree);
  return diff;
};
