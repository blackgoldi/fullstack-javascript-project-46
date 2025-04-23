import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

function jsonParser(filePath) {
  const completePath = path.resolve(filePath);
  const data = readFileSync(completePath);
  const result = JSON.parse(data);
  return result;
}

function yamlParser(filePath) {
  const completePath = path.resolve(filePath);
  const data = readFileSync(completePath);
  return yaml.load(data);
}

export default function parser(filePath) {
  const format = path.extname(filePath);
  let parse;
  if (format === '.json') {
    parse = jsonParser;
  } else if (format === '.yaml' || format === '.yml') {
    parse = yamlParser;
  }
  return parse(filePath);
}
