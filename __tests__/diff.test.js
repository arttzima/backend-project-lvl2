import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import buildTree from '../src/buildTree.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import toJson from '../src/formatters/toJson.js';
import genDiff from '../index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test('stylish', () => {
  const data1 = JSON.parse(readFile('file1.json'));
  const data2 = JSON.parse(readFile('file2.json'));
  const tree = buildTree(data1, data2);
  const result = readFile('expected.txt');

  expect(stylish(tree)).toEqual(result);
});

test('plain', () => {
  const data1 = yaml.load(readFile('file1.yml'));
  const data2 = yaml.load(readFile('file2.yml'));
  const tree = buildTree(data1, data2);
  const result = readFile('expected_plain.txt');

  expect(plain(tree)).toEqual(result);
});

test('toJson', () => {
  const data1 = JSON.parse(readFile('file1.json'));
  const data2 = JSON.parse(readFile('file2.json'));
  const tree = buildTree(data1, data2);
  const result = readFile('expected_json.txt');

  expect(toJson(tree)).toEqual(result);
});

test('genDiff', () => {
  const diff = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const result = readFile('expected.txt');

  expect(diff).toEqual(result);
});
