import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const diff = keys.map(key => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: getDiff(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (data1[key] !== data2[key]) {
      return { key, type: 'updated', value1: data1[key], value2: data2[key] };
    }
    return { key, type: 'unchanged', value1: data1[key] };
  })

  return diff;
};

export default getDiff;
