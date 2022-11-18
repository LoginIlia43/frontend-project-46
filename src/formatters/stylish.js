import _ from "lodash";

const getValue = (propValue, depth = 0) => {
  const indent = '    '.repeat(depth);

  if (!_.isObject(propValue)) {
  return propValue;
  }
  const entries = Object.entries(propValue);
  const result = entries.map(([key, value]) => {
    return `    ${indent}${key}: ${getValue(value, depth + 1)}`
  })

  return [
    '{',
    ...result,
    indent + '}'
  ].join('\n');
};

const stylish = (nodes, depth = 0) => {
  const indent = '    '.repeat(depth);
  const result = nodes.flatMap(node => {
    switch (node.type) {
      case 'updated':
        return [
          `  ${indent}- ${node.key}: ${getValue(node.value1, depth + 1)}`,
          `  ${indent}+ ${node.key}: ${getValue(node.value2, depth + 1)}`
        ];
      case 'unchanged':
        return `  ${indent}  ${node.key}: ${getValue(node.value1, depth + 1)}`;
      case 'deleted':
        return `  ${indent}- ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'added':
        return `  ${indent}+ ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'nested':
        return `  ${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
    };
  })

  return [
    '{',
    ...result,
    indent + '}'
  ].join('\n');
};

export default stylish;
