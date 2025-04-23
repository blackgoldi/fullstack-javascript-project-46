#!/usr/bin/env node
import buildDiff from './src/buildiff.js';
import formatPlain from './src/formatters/plain.js';
import formatStylish from './src/formatters/stylish.js';
import parser from './src/parser.js';
import formatJson from './src/formatters/json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default function findDiff(path1, path2, format = 'stylish') {
  const firstFile = parser(path1);
  const secondFile = parser(path2);
  const diff = buildDiff(firstFile, secondFile);
  return formatters[format](diff);
}
