import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.ini': ini.parse,
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

const getParser = (ext) => {
  const parser = parsers[ext];
  if (!parser) {
    throw new Error('Wrong file extension. Please use .json or .yml or .ini');
  }
  return parser;
};

export default getParser;
