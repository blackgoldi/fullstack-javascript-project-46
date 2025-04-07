import { expect, test } from 'vitest';
import findDiff from '../src/cli.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getFixturePath(filename) {
  return path.join(__dirname, '..', '__fixtures__', filename).toString();
}

test('equalJSON', () => {
  expect(findDiff(getFixturePath('file1.json'), getFixturePath('file1.json')))
    .toBe(`{
    host : hexlet.io
    timeout : 50
    proxy : 123.234.53.22
    follow : false
}`);
});

test('differentJSON', () => {
  expect(findDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toBe(`{
    host : hexlet.io
  - timeout : 50
  + timeout : 20
  - proxy : 123.234.53.22
  - follow : false
  + verbose : true
}`);
});

test('equalYAML', () => {
  expect(findDiff(getFixturePath('file1.yaml'), getFixturePath('file1.yaml')))
    .toBe(`{
    host : hexlet.io
    timeout : 50
    proxy : 123.234.53.22
    follow : false
}`);
});

test('differentYAML', () => {
  expect(findDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))
    .toBe(`{
    host : hexlet.io
  - timeout : 50
  + timeout : 20
  - proxy : 123.234.53.22
  - follow : false
  + verbose : true
}`);
});
