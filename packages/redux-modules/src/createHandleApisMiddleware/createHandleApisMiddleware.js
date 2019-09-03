import { egApiTake } from '../apis';

function camalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9/]+(.)/g, (m, chr) => chr.toUpperCase());
}

function getApiInfos(leafs) {
  let apiMethod;
  let apiType;
  for (let i = 0; i < leafs.length; i++) {
    const el = leafs[i];
    if (el.indexOf('fetch') !== -1) {
      const array = el.split(/(?=[A-Z])/);
      apiMethod = array[1];
      apiType = array[array.length - 1];
      if (
        apiType !== 'request' ||
        apiType !== 'cancel' ||
        apiType !== 'success' ||
        apiType !== 'failure'
      ) {
        apiType = undefined;
      }
    }
  }
  return [apiMethod, apiType];
}

function createHandleApisMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const fetchIndex = action.type.indexOf('FETCH');
    if (fetchIndex !== -1) {
      const leafs = camalize(action.type).split('/');
      const [apiMethod, apiType] = getApiInfos(leafs);
      if (!apiType) {
        dispatch(egApiTake(leafs));
      }
    }
    return next(action);
  };
}

export default createHandleApisMiddleware;
