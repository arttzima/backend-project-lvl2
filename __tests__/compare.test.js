import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import compare from '../src/compare.js';
import parse from '../src/parse.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test('compare', () => {
  const data1 = parse(readFile('file1.json'));
  const data2 = parse(readFile('file2.json'));
  const result = readFile('expected.txt');

  expect(compare(data1, data2)).toEqual(result);
});
