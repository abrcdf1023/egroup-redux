import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/**
 * Types
 */
export const INIT_API = 'INIT_API';

/**
 * Actions
 */
export const initApi = createAction(INIT_API);

/**
 * Selectors
 */

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [INIT_API]: (state, action) =>
      state.setIn(
        action.payload,
        Map({
          isLoading: false,
          isError: false
        })
      )
  },
  Map()
);
