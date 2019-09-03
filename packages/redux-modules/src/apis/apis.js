import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/**
 * Types
 */
export const EG_API_TAKE = 'EG_API_TAKE';
export const EG_API_REQUEST = 'EG_API_REQUEST';
export const EG_API_CANCEL = 'EG_API_CANCEL';
export const EG_API_SUCCESS = 'EG_API_SUCCESS';
export const EG_API_FAILURE = 'EG_API_FAILURE';

/**
 * Actions
 */
export const egApiTake = createAction(EG_API_TAKE);
export const egApiRequest = createAction(EG_API_REQUEST);
export const egApiCancel = createAction(EG_API_CANCEL);
export const egApiSuccess = createAction(EG_API_SUCCESS);
export const egApiFailure = createAction(EG_API_FAILURE);

/**
 * Selectors
 */

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [EG_API_TAKE]: (state, action) =>
      state.setIn([...action.payload, 'isError'], false),
    [EG_API_REQUEST]: (state, action) =>
      state.setIn([...action.payload, 'isLoading'], true),
    [EG_API_CANCEL]: (state, action) =>
      state.setIn([...action.payload, 'isLoading'], false),
    [EG_API_SUCCESS]: (state, action) => {
      let newState = state
        .set('isLoading', false)
        .set('latestUpdated', new Date().getTime());

      return state.setIn([...action.payload, 'isLoading'], false);
    }
  },
  Map()
);
