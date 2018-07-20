import _ from 'lodash';


const nodeType = [
  {
    type: 'has children',
    func: (node, parent, g, f) => `${f(node.children, `${parent}${node.name}.`)}`,
  },
  {
    type: 'changed',
    func: (node, parent, g) => `Property '${parent}${node.name}' was updated from ${g(node.oldValue)} to ${g(node.newValue)}`,
  },
  {
    type: 'added',
    func: (node, parent, g) => `Property '${parent}${node.name}' was added with value: ${g(node.newValue)}`,
  },
  {
    type: 'deleted',
    func: (node, parent) => `Property '${parent}${node.name}' was removed`,
  },
];

const elemToStr = (elem) => {
  if (_.isObject(elem)) {
    return 'complex value';
  }
  return elem;
};

const ASTtoString = (ast, parent = '') => {
  const filtered = ast.filter(node => node.type !== 'unchanged');
  const buildStr = (elem) => {
    const { func } = nodeType.find(({ type }) => type === elem.type);
    return func(elem, parent, elemToStr, ASTtoString);
  };

  const mapped = filtered.map(buildStr);
  const addSpaces = _.flatten(mapped);

  return addSpaces.join('\n');
};

const buildPlain = data => ASTtoString(data);

export default buildPlain;
