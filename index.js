import path from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './src/parse.js';
import compare from './src/compare.js';

export default (path1, path2) => {
  const filepath1 = path.resolve(path1);
  const filepath2 = path.resolve(path2);

  const file1 = readFileSync(filepath1, 'utf-8');
  const file2 = readFileSync(filepath2, 'utf-8');

  const o1 = parse(file1);
  const o2 = parse(file2);

  compare(o1, o2);
};
