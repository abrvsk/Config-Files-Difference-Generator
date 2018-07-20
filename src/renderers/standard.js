import _ from 'lodash';


const nodeType = [
  {
    type: 'has children',
    func: (g, node, f, depth) => [`  ${node.name}: {\n${f(node.children, depth)}`, '  }'],
  },
  {
    type: 'changed',
    func: (g, node) => [`- ${node.name}: ${g(node.oldValue)}`, `+ ${node.name}: ${g(node.newValue)}`],
  },
  {
    type: 'unchanged',
    func: (g, node) => `  ${node.name}: ${g(node.value)}`,
  },
  {
    type: 'added',
    func: (g, node) => `+ ${node.name}: ${g(node.newValue)}`,
  },
  {
    type: 'deleted',
    func: (g, node) => `- ${node.name}: ${g(node.oldValue)}`,
  },
];

const standardRender = (data) => {
  const ASTtoString = (ast, depth = 0) => {
    const strSpasesCount = (str) => {
      const spacesCount = (depth * 4) + 2;
      return `${' '.repeat(spacesCount)}${str}`;
    };
    const elemToStr = (elem) => {
      if (!_.isObject(elem)) {
        return elem;
      }
      const keys = Object.keys(elem);
      const addSpaces = [keys.map(key => `${' '.repeat(6)}${key}: ${(elem[key])}`), '  }'];
      const result = addSpaces.map(strSpasesCount);
      return `{\n${result.join('\n')}`;
    };
    const buildStr = (elem) => {
      const { func } = nodeType.find(({ type }) => type === elem.type);
      return func(elemToStr, elem, ASTtoString, depth + 1);
    };
    const mapped = ast.map(buildStr);
    const addSpaces = _.flatten(mapped).map(strSpasesCount);
    return addSpaces.join('\n');
  };

  return `{\n${ASTtoString(data)}\n}`;
};

export default standardRender;
