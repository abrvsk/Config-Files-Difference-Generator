import _ from 'lodash';

const defineType = [
  {
    type: 'has children',
    check: (first, second, key) => _.isObject(first[key]) && _.isObject(second[key]),
    func: (first, second, f) => ({ children: [...f(first, second)] }),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key))
                                        && (first[key] !== second[key]),
    func: (first, second) => ({ oldValue: first, newValue: second }),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key))
                                        && (first[key] === second[key]),
    func: element => ({ value: element }),
  },
  {
    type: 'added',
    check: (first, second, key) => !_.has(first, key) && _.has(second, key),
    func: (first, second) => ({ newValue: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => _.has(first, key) && !_.has(second, key),
    func: element => ({ oldValue: element }),
  },
];

const buildAST = (file1, file2) => {
  const buildNode = (key) => {
    const { type, func } = defineType.find(({ check }) => check(file1, file2, key));
    return ({ name: key, type, ...func(file1[key], file2[key], buildAST) });
  };

  const allKeys = _.union(Object.keys(file1), Object.keys(file2));
  const ast = allKeys.map(buildNode);
  return ast;
};

export default buildAST;
