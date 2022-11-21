import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value)) {
    return value;
  }
  if (_.isNull(value)) {
    return 'null';
  }
  return `'${value}'`;
};

const plain = (diff) => {
  const iter = (node, path) => {
    const lines = node.flatMap((line) => {
      const keyPath = (path === '' ? `${line.key}` : `${path}.${line.key}`);

      switch (line.type) {
        case 'nested':
          return iter(line.children, keyPath);
        case 'deleted':
          return `Property '${keyPath}' was removed`;
        case 'added':
          return `Property '${keyPath}' was added with value: ${getValue(line.value)}`;
        case 'unchanged':
          return null;
        case 'updated':
          return `Property '${keyPath}' was updated. From ${getValue(line.value1)} to ${getValue(line.value2)}`;
        default:
          throw new Error(`unknown property of data: ${keyPath}`);
      }
    });
    return lines
      .filter((line) => line !== null)
      .join('\n');
  };
  return iter(diff, '');
};

export default plain;
