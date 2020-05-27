import { handleActions } from 'redux-actions';
import warning from 'warning';
import produce from 'immer';
import { supportedTypes, getTrimedLeafs } from '../utils';
import { setIn, deleteIn, hasIn } from '../utils';

import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE,
  EG_CLEAR_API_RESPONSE,
  EG_CLEAR_APIS_RESPONSE,
  EG_DESTROY_API
} from './types';

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [EG_API_TAKE]: produce((draft, action) => {
      setIn(draft, [...action.payload.leafs, 'isError'], false);
    }),
    [EG_API_REQUEST]: produce((draft, action) => {
      setIn(draft, [...action.payload.leafs, 'isLoading'], true);
    }),
    [EG_API_CANCEL]: produce((draft, action) => {
      setIn(draft, [...action.payload.leafs, 'isLoading'], false);
    }),
    [EG_API_SUCCESS]: produce((draft, action) => {
      setIn(draft, [...action.payload.leafs, 'isLoading'], false);

      if (typeof action.payload.response !== 'undefined') {
        setIn(
          draft,
          [...action.payload.leafs, 'response'],
          action.payload.response
        );
      }
    }),
    [EG_API_FAILURE]: produce((draft, action) => {
      setIn(draft, [...action.payload.leafs, 'isLoading'], false);
      setIn(draft, [...action.payload.leafs, 'isError'], true);
      if (action.payload.error) {
        setIn(draft, [...action.payload.leafs, 'error'], action.payload.error);
      }
    }),
    [EG_CLEAR_API_RESPONSE]: produce((draft, action) => {
      const [isSupported, type] = supportedTypes(action.payload, ['object']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "clearApiResponse" is not supported "${type}" payload.`
        );
        return;
      }
      const actionType = action.payload.type;
      if (typeof actionType !== 'string') {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Redux action type need to be "string" not "${typeof actionType}"`
        );
        return;
      }
      const trimedLeafs = getTrimedLeafs(actionType);
      deleteIn(draft, [...trimedLeafs, 'response']);
    }),
    [EG_CLEAR_APIS_RESPONSE]: produce((draft, action) => {
      const [isSupported, type] = supportedTypes(action.payload, ['array']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action clearApisResponse is not supported ${type} payload.`
        );
        return;
      }
      const actionTypes = [];
      for (let i = 0; i < action.payload.length; i++) {
        const actionType = action.payload[i].type;
        if (typeof actionType !== 'string') {
          warning(
            false,
            `[@e-group/redux-modules] ERROR: Redux action type need to be "string" not "${typeof actionType}"`
          );
          return;
        }
        actionTypes.push(actionType);
      }
      actionTypes.forEach(actionType => {
        const trimedLeafs = getTrimedLeafs(actionType);
        deleteIn(draft, [...trimedLeafs, 'response']);
      });
    }),
    [EG_DESTROY_API]: produce((draft, action) => {
      const [isSupported, type] = supportedTypes(action.payload, ['array']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action destroyApi is not supported ${type} payload.`
        );
        return;
      }
      if (hasIn(draft, action.payload)) {
        setIn(draft, action.payload, {});
      }
    })
  },
  {}
);
