/**
 * Check variable has supported types(at least one of all).
 * @param {any} variable
 * @param {array} supportedTypes
 */
export default function supportedTypes(variable, supportedTypes) {
  let type = typeof variable;
  if (type === 'object') {
    if (variable === null) {
      type = 'null';
    }
    if (Array.isArray(variable)) {
      type = 'array';
    }
  }
  let isSupported = false;
  supportedTypes.forEach(supportedType => {
    if (type === supportedType) {
      isSupported = true;
    }
  });
  return [isSupported, type];
}
