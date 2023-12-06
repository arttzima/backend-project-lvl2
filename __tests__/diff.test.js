import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import buildTree from '../src/buildTree.js';
import buildDiff from '../src/stylish.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test('buildDiff', () => {
  const data1 = JSON.parse(readFile('file1.json'));
  const data2 = JSON.parse(readFile('file2.json'));
  const tree = buildTree(data1, data2);
  const result = readFile('expected.txt');

  expect(buildDiff(tree)).toEqual(result);
});

test('buildDiff', () => {
  const data1 = yaml.load(readFile('file1.yml'));
  const data2 = yaml.load(readFile('file2.yml'));
  const tree = buildTree(data1, data2);
  const result = readFile('expected.txt');

  expect(buildDiff(tree)).toEqual(result);
});
