#!/usr/bin/env node
import buildDiff from './buildiff.js';
import formatPlain from './formatters/plain.js';
import formatStylish from './formatters/stylish.js';
import parser from './parser.js';
import formatJson from './formatters/json.js';

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
