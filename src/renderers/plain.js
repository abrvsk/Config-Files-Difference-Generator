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
    type: 'unchanged',
    func: () => '',
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
  const buildStr = (elem) => {
    const { func } = nodeType.find(({ type }) => type === elem.type);
    return func(elem, parent, elemToStr, ASTtoString);
  };

  const mapped = ast.map(buildStr);
  const addSpaces = _.flatten(mapped).filter(value => value !== '');

  return addSpaces.join('\n');
};

const deepFilter = (node) => {
  if (node.children) return node.children.filter(elem => elem.type !== 'unchanged');
  return node.type !== 'unchanged';
}

const buildPlain = (data) => {
  const filtered = data.filter(deepFilter);
  return ASTtoString(filtered);
};


export default buildPlain;
