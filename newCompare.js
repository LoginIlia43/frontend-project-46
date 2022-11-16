import compareFilesData from './src/compareFilesData.js';
import parsers from './src/parsers.js';
import _ from 'lodash';


////////////////DELETE////////////DELETE/////////////////

const testFile3 = parsers('file3.json');
const testFile4 = parsers('file4.json');

const makeTree = (object) => {
  const makeNodes = (object) => {
    const entries = Object.entries(object);
    let name;
    let type;
    let value;
    let children;

    const tree = entries.map(entrie => {
      const [key, val] = entrie;
      name = key;

      if (_.isObject(val) && !_.isArray(val) ) {
        children = makeNodes(val);
        type = 'internal';

        return { name, type, children };
      } else {
        value = val;
        type = 'leaf';
        
        return { name, type, value };
      }
    })
    return tree;
  }

  return makeNodes(object);
};

const tree3 = makeTree(testFile3);
const tree4 = makeTree(testFile4);

const getChildren = node => Object.hasOwn(node, 'children') ? node.children : [];

const diff = (tree1, tree2) => {
  const nodes1 = _.cloneDeep(tree1);
  const nodes2 = _.cloneDeep(tree2);
  const names1 = nodes1.map(node => node.name);
  const names2 = nodes2.map(node => node.name);
  const namesUnique = _.union(names1, names2);

  //для каждого имени делаем сравнение
  const compare = namesUnique.flatMap(name => {
    const nodeArr1 = nodes1.filter(node => node.name === name);
    const nodeArr2 = nodes2.filter(node => node.name === name);
    const node1 = nodeArr1[0];
    const node2 = nodeArr2[0];

    //проверить наличие имени объектов
    if ((nodeArr1.length === 1) && (nodeArr2.length === 1)) {
     
      // если имя есть в обоих, проверить type
      if ((node1.type === 'leaf') && (node2.type === 'leaf')) {
        
        //если оба типа leaf, то проверяем значения 
        //* потом добавить условие по сравнению массивов
        if (node1.value === node2.value) {
          node1['mod'] = ' ';

          return node1;
        } else {
          node1['mod'] = '-';
          node2['mod'] = '+';

          return [node1, node2];
        }
      }

      if (node1.type !== node2.type) {
        node1['mod'] = '-';
        node2['mod'] = '+';

        return [node1, node2];
      }

      if ((node1.type === 'internal') && (node2.type === 'internal')) {
        const children1 = getChildren(node1);
        const children2 = getChildren(node2);
        node1['mod'] = ' ';

        const compareInternal = diff(children1, children2);
        const newNode = _.clone(node1);
        newNode.children = compareInternal;

        return newNode;
      }
    } else if (nodeArr1.length === 1) {
      node1['mod'] = '-';

      return node1;
    } else {
      node2['mod'] = '+';

      return node2;
    }
  });

  return compare;
};