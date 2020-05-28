import { handleActions } from 'redux-actions';
import { Map, isImmutable } from 'immutable';

import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA
} from './types';

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [INITIALIZE_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.update(action.payload, snackbarState => {
          if (isImmutable(snackbarState)) {
            return snackbarState;
          }
          return Map({
            isOpen: false
          });
        });
      }
      return state;
    },
    [OPEN_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], true);
      }
      return state;
    },
    [CLOSE_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], false);
      }
      return state;
    },
    [SET_SNACKBAR_DATA]: (state, action) => {
      if (action.payload) {
        const { name, ...other } = action.payload;
        return state.update(name, el => el.merge(other));
      }
      return state;
    }
  },
  Map()
);
