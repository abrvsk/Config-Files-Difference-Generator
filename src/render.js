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

const ASTtoString = (ast, depth = 0) => {
  const strSpasesCount = (str) => {
    const spacesCount = (depth * 4) + 2;
    return `${' '.repeat(spacesCount)}${str}`;
  };
  const elemToStr = (elem) => {
    if (_.isObject(elem)) {
      const keys = Object.keys(elem);
      const addSpaces = [keys.map(key => `${key}: ${elem[key]}`), '}'].map(strSpasesCount);
      return `{\n${addSpaces.join('\n')}`;
    }
    return elem;
  };
  const buildStr = (elem) => {
    const { func } = nodeType.find(({ type }) => type === elem.type);
    return func(elemToStr, elem, ASTtoString, depth + 1);
  };
  const mapped = ast.map(buildStr);
  const addSpaces = _.flatten(mapped).map(strSpasesCount);
  return addSpaces.join('\n');
};

export default ASTtoString;
