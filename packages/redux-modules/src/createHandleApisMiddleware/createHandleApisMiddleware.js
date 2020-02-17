import {
  egApiTake,
  egApiRequest,
  egApiCancel,
  egApiSuccess,
  egApiFailure
} from '../apis';
import { camalize, getApiInfos, trimLeafs, findFetchIndex } from '../utils';

/**
 * Use to dispatch fetch actions automatically.
 */
function createHandleApisMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action.type.indexOf('FETCH') !== -1) {
      const leafs = camalize(action.type).split('/');
      const apiIndex = findFetchIndex(leafs);
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
