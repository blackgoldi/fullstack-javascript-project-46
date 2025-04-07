#!/usr/bin/env node
import parser from './parser.js';

function formatEntry(prefix, key, value) {
  return `  ${prefix} ${key} : ${value}`;
}

export default function findDiff(path1, path2) {
  const firstJson = parser(path1);
  const secondJson = parser(path2);
  const diff = [];
  Object.entries(firstJson).forEach(([key, value]) => {
    const secondValue = secondJson[key];
    if (secondValue == null) {
      diff.push(formatEntry('-', key, value));
    } else if (value != secondValue) {
      diff.push(formatEntry('-', key, value));
      diff.push(formatEntry('+', key, secondValue));
    } else {
      diff.push(formatEntry(' ', key, value));
    }
  });
  Object.entries(secondJson).forEach(([key, value]) => {
    if (!(key in firstJson)) {
      diff.push(formatEntry('+', key, value));
    }
  });
  return `{\n${diff.join('\n')}\n}`;
}
