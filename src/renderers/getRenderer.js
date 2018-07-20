import standard from './standard';
import plain from './plain';

const renderers = {
  standard,
  plain,
};

const getRenderer = (format) => {
  const renderer = renderers[format];
  if (!renderer) {
    throw new Error(`Error: bad format: ${format}. Please use 'plain' or 'standard'`);
  }
  return renderer;
};

export default getRenderer;
