
const nodeType = [
  {
    type: 'has children',
    func: (node, f) => f(node),
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

const ASTtoString = (ast, i = 0) => {
  if (i > 20) {
    return ast;
  }
  console.log(ast);
  const buildStr = (elem) => {
    const { func } = nodeType.find(({ type }) => type);
    return func(elem, ASTtoString);
  };
  if (ast instanceof Array) {
    const toStr = ast.map(buildStr);
    return toStr;
  }
  return buildStr(ast, i + 1);
};

export default ASTtoString;
