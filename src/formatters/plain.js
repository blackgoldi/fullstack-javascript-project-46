const stringifyValue = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const formatPlain = (diff, path = []) => {
  const lines = diff.flatMap((node) => {
    const currentPath = [...path, node.key];
    const propertyPath = currentPath.join('.');

    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringifyValue(node.value)}`;
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;
