// Повторение строки - функция repeat. Например ' '.repeat(2)

// AST это не представление, представление зависит от AST,
// AST ничего не знает про то как его используют для вывода

// В AST есть понятие children (как в любом дереве), но value и children это не одно и тоже.

// Children строится только в одном случае, когда значение одного и того же ключа в обоих
// структурах - объект. Иначе значения никак не анализируются и добавляются в AST как есть.
// Их форматирование на выводе - ответственность рендерера.

// Для отображения value придется написать свою собственную функцию stringify,
// которая формирует форматированный вывод значения без кавычек.
import _ from 'lodash';

const defineType = [
  {
    type: 'has children',
    check: (element1, element2, key) => _.isObject(element1[key]) && _.isObject(element2[key]),
    func: (element1, element2, f) => ({ children: f(element1, element2) }),
  },
  {
    type: 'changed',
    check: (element1, element2, key) => (_.has(element1, key) && _.has(element2, key))
                                        && (element1[key] !== element2[key]),
    func: (element1, element2) => ({ oldValue: element1, newValue: element2 }),
  },
  {
    type: 'unchanged',
    check: (element1, element2, key) => (_.has(element1, key) && _.has(element2, key))
                                        && (element1[key] === element2[key]),
    func: element => ({ value: element }),
  },
  {
    type: 'added',
    check: (element1, element2, key) => !_.has(element1, key) && _.has(element2, key),
    func: (element1, element2) => ({ newValue: element2 }),
  },
  {
    type: 'deleted',
    check: (element1, element2, key) => _.has(element1, key) && !_.has(element2, key),
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
