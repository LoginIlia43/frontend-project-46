import _ from 'lodash';

const getKeys = (obj) => Object.keys(obj);

const mergeKeys = (keys1, keys2) => {
  const mergedKeys = [...keys1];
  const uniqueKeys2 = keys2.filter((key) => !mergedKeys.includes(key));
  mergedKeys.push(...uniqueKeys2);

  return mergedKeys;
};

const compareFilesData = (object1, object2) => {
  const keys1 = getKeys(object1);
  const keys2 = getKeys(object2);
  const allKeys = mergeKeys(keys1, keys2);
  const getValue = (object, key) => object[key];

  const resultArray = [];
  for (const key of allKeys) {
    const value1 = getValue(object1, key);
    const value2 = getValue(object2, key);

    if (keys1.includes(key) && keys2.includes(key)) {
      value1 === value2 ? resultArray.push({
        symbol: ' ', key, value: value1, file: 1,
      }) : resultArray.push({
        symbol: '-', key, value: value1, file: 1,
      }, {
        symbol: '+', key, value: value2, file: 2,
      });
    } else if (keys1.includes(key)) {
      resultArray.push({
        symbol: '-', key, value: value1, file: 1,
      });
    } else {
      resultArray.push({
        symbol: '+', key, value: value2, file: 2,
      });
    }
  }
  const sortedArray = _.orderBy(resultArray, ['key', 'file'], ['asc', 'asc']);

  const editedArray = sortedArray.map((object) => {
    const { symbol, key, value } = object;
    const arr = [`  ${symbol} ${key}: ${value}`];
    return arr;
  });
  const resultStr = editedArray.join('\n');

  return `{\n${resultStr}\n}`;
};

export default compareFilesData;
