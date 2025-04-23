const stringify = (value, depth) => {
  if (!(value instanceof Object)) return String(value)

  const indent = ' '.repeat(depth * 4 + 2)
  const entries = Object.entries(value)
  const lines = entries.map(
    ([k, v]) => `${indent}  ${k}: ${stringify(v, depth + 1)}`,
  )
  return `{\n${lines.join('\n')}\n${indent.slice(2)}}`
}

const formatNode = (node, depth, formatter) => {
  const indent = ' '.repeat(depth * 4 - 2)

  switch (node.type) {
    case 'added':
      return `${indent}+ ${node.key}: ${formatter(node.value, depth)}`
    case 'removed':
      return `${indent}- ${node.key}: ${formatter(node.value, depth)}`
    case 'changed':
      return `${indent}- ${node.key}: ${formatter(node.oldValue, depth)}\n${indent}+ ${node.key}: ${formatter(node.newValue, depth)}`
    case 'nested':
      return `${indent}  ${node.key}: {\n${formatNodes(
        node.children,
        depth + 1,
      )}\n${indent}  }`
    default:
      return `${indent}  ${node.key}: ${formatter(node.value, depth)}`
  }
}

const formatNodes = (nodes, depth) =>
  nodes.flatMap(node => formatNode(node, depth, stringify)).join('\n')

function formatStylish(diff) {
  return `{\n${formatNodes(diff, 1)}\n}`
}
export default formatStylish
