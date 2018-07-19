
const nodeType = [
  {
    type: 'has children',
    func: (node, f) => `${node.name}: {\n${f(node.children)}\n}`,
  },
  {
    type: 'changed',
    func: node => `- ${node.name}: ${node.oldValue}\n+ ${node.name}: ${node.newValue}`,
  },
  {
    type: 'unchanged',
    func: node => `  ${node.name}: ${node.value}`,
  },
  {
    type: 'added',
    func: node => `+ ${node.name}: ${node.newValue}`,
  },
  {
    type: 'deleted',
    func: node => `- ${node.name}: ${node.oldValue}`,
  },
];

const ASTtoString = (ast) => {
  const buildStr = (elem) => {
    const { func } = nodeType.find(({ type }) => type === elem.type);
    return func(elem, ASTtoString);
  };
  if (ast instanceof Array) {
    return ast.map(buildStr);
  }
  return buildStr(ast);
};

export default ASTtoString;
