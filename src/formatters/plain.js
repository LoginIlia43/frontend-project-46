import _ from 'lodash';

const getValue = (line) => (_.isObject(line) ? '[complex value]' : `${line}`);

const plain = (diff) => {
  const iter = (node, path) => {
    const lines = node.flatMap((line) => {
      const keyPath = (path === '' ? `${line.key}` : `${path}.${line.key}`);

      switch (line.type) {
        case 'nested':
          return iter(line.children, `${line.key}`);
        case 'deleted':
          return `Property '${keyPath}' was removed`;
        case 'added':
          return `Property '${keyPath}' was added with value: '${getValue(line.value)}'`;
        case 'unchanged':
          return null;
        case 'updated':
          return `Property '${keyPath}' was updated. From '${getValue(line.value1)}' to '${getValue(line.value2)}'`;
        default:
          throw new Error(`unknown property of data: '${keyPath}'`);
      }
    });
    return lines
      .filter((line) => line !== null)
      .join('\n');
  };
  return iter(diff, '');
};

export default plain;
