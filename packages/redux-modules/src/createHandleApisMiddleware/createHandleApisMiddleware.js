import findIndex from 'lodash/findIndex';
import {
  egApiTake,
  egApiRequest,
  egApiCancel,
  egApiSuccess,
  egApiFailure
} from '../apis';

function camalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9/]+(.)/g, (m, chr) => chr.toUpperCase());
}

function getApiInfos(api) {
  let apiMethod;
  let apiType;
  const array = api.split(/(?=[A-Z])/);
  apiMethod = array[1];
  apiType = array[array.length - 1].toLowerCase();
  if (
    apiType !== 'request' &&
    apiType !== 'cancel' &&
    apiType !== 'success' &&
    apiType !== 'failure'
  ) {
    apiType = undefined;
  }
  return [apiMethod, apiType];
}

function trimLeafs(leafs, fetchIndex) {
  const trimedLeafs = [...leafs];
  trimedLeafs[fetchIndex] = trimedLeafs[fetchIndex].replace(
    /Request|Cancel|Success|Failure/,
    ''
  );
  return trimedLeafs;
}

function createHandleApisMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const fetchIndex = action.type.indexOf('FETCH');
    if (fetchIndex !== -1) {
      const leafs = camalize(action.type).split('/');
      const apiIndex = findIndex(leafs, el => el.indexOf('fetch') !== -1);
      const [apiMethod, apiType] = getApiInfos(leafs[apiIndex]);
      const trimedLeafs = trimLeafs(leafs, apiIndex);
      if (!apiType) {
        dispatch(egApiTake({ leafs: trimedLeafs }));
      }
      if (apiType === 'request') {
        dispatch(egApiRequest({ leafs: trimedLeafs }));
      }
      if (apiType === 'cancel') {
        dispatch(egApiCancel({ leafs: trimedLeafs }));
      }
      if (apiType === 'success') {
        dispatch(
          egApiSuccess({
            leafs: trimedLeafs,
            response: action.payload
          })
        );
      }
      if (apiType === 'failure') {
        dispatch(
          egApiFailure({
            leafs: trimedLeafs,
            error: action.payload
          })
        );
      }
    }
    return next(action);
  };
}

export default createHandleApisMiddleware;
