import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getParser = {
  '.ini': ini.parse,
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (file) => {
  const fileExt = path.extname(file);
  return getParser[fileExt];
};
