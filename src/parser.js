import yaml from 'js-yaml';
import ini from 'ini';

export default {
  '.ini': ini.parse,
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};
