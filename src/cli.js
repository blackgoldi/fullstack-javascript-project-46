#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

function parseFile(filePath) {
  const completePath = path.resolve(cwd(), filePath);
  const data = readFileSync(completePath);
  const json = JSON.parse(data);
  return json;
}

function formatEntry(prefix, key, value) {
  return `  ${prefix} ${key} : ${value}`;
}

export default function findDiff(path1, path2) {
  const firstJson = parseFile(path1);
  const secondJson = parseFile(path2);
  const diff = [];
  Object.entries(firstJson).forEach(([key, value]) => {
    const secondValue = secondJson[key];
    if (!secondValue) {
      diff.push(formatEntry('-', key, value));
    } else if (value !== secondValue) {
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
