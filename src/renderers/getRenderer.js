import standard from './standard';
import plain from './plain';

const renderers = {
  standard,
  plain,
  json: JSON.stringify,
};

const getRenderer = (format) => {
  const renderer = renderers[format];
  if (!renderer) {
    throw new Error(`Error: bad format: ${format}. Please use 'plain', 'standard' or 'json'`);
  }
  return renderer;
};

export default getRenderer;
