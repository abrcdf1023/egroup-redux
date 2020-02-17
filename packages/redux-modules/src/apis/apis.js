import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import warning from 'warning';
import { supportedTypes, camalize, findFetchIndex, trimLeafs } from '../utils';

const getTrimedLeafs = actionType => {
  const leafs = camalize(actionType).split('/');
  const fetchIndex = findFetchIndex(leafs);
  return trimLeafs(leafs, fetchIndex);
};

/**
 * Types
 */
export const EG_API_TAKE = 'EG_API_TAKE';
export const EG_API_REQUEST = 'EG_API_REQUEST';
export const EG_API_CANCEL = 'EG_API_CANCEL';
export const EG_API_SUCCESS = 'EG_API_SUCCESS';
export const EG_API_FAILURE = 'EG_API_FAILURE';
export const EG_CLEAR_API_RESPONSE = 'EG_CLEAR_API_RESPONSE';
export const EG_CLEAR_API_RESPONSES = 'EG_CLEAR_API_RESPONSES';

/**
 * Actions
 */
export const egApiTake = createAction(EG_API_TAKE);
export const egApiRequest = createAction(EG_API_REQUEST);
export const egApiCancel = createAction(EG_API_CANCEL);
export const egApiSuccess = createAction(EG_API_SUCCESS);
export const egApiFailure = createAction(EG_API_FAILURE);
export const clearApiResponse = createAction(EG_CLEAR_API_RESPONSE);
export const clearApiResponses = createAction(EG_CLEAR_API_RESPONSES);

/**
 * Selectors
 */

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [EG_API_TAKE]: (state, action) =>
      state.setIn([...action.payload.leafs, 'isError'], false),
    [EG_API_REQUEST]: (state, action) =>
      state.setIn([...action.payload.leafs, 'isLoading'], true),
    [EG_API_CANCEL]: (state, action) =>
      state.setIn([...action.payload.leafs, 'isLoading'], false),
    [EG_API_SUCCESS]: (state, action) => {
      let newState = state.setIn([...action.payload.leafs, 'isLoading'], false);

      if (typeof action.payload.response !== 'undefined') {
        newState = newState.setIn(
          [...action.payload.leafs, 'response'],
          action.payload.response
        );
      }

      return newState;
    },
    [EG_API_FAILURE]: (state, action) => {
      let newState = state.setIn([...action.payload.leafs, 'isLoading'], false);
      newState = newState.setIn([...action.payload.leafs, 'isError'], true);
      if (action.payload.error) {
        newState = newState.setIn(
          [...action.payload.leafs, 'error'],
          action.payload.error
        );
      }
      return newState;
    },
    [EG_CLEAR_API_RESPONSE]: (state, action) => {
      const [isSupported, type] = supportedTypes(action.payload, ['object']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "clearApiResponse" is not supported "${type}" payload.`
        );
        return state;
      }
      const actionType = action.payload.type;
      if (typeof actionType !== 'string') {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Redux action type need to be "string" not "${typeof actionType}"`
        );
        return state;
      }
      const trimedLeafs = getTrimedLeafs(actionType);
      return state.deleteIn([...trimedLeafs, 'response']);
    },
    [EG_CLEAR_API_RESPONSES]: (state, action) => {
      const [isSupported, type] = supportedTypes(action.payload, ['array']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action clearApiResponses is not supported ${type} payload.`
        );
        return state;
      }
      const actionTypes = [];
      for (let i = 0; i < action.payload.length; i++) {
        const actionType = action.payload[i].type;
        if (typeof actionType !== 'string') {
          warning(
            false,
            `[@e-group/redux-modules] ERROR: Redux action type need to be "string" not "${typeof actionType}"`
          );
          return state;
        }
        actionTypes.push(actionType);
      }
      let nextState = state;
      actionTypes.forEach(actionType => {
        const trimedLeafs = getTrimedLeafs(actionType);
        nextState = nextState.deleteIn([...trimedLeafs, 'response']);
      });
      return nextState;
    }
  },
  Map()
);
