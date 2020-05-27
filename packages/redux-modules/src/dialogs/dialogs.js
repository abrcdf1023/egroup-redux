import { handleActions } from 'redux-actions';
import { Map, isImmutable } from 'immutable';

import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA
} from './types';

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [INITIALIZE_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.update(action.payload, dialogState => {
          if (isImmutable(dialogState)) {
            return dialogState;
          }
          return Map({
            isOpen: false
          });
        });
      }
      return state;
    },
    [OPEN_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], true);
      }
      return state;
    },
    [CLOSE_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], false);
      }
      return state;
    },
    [SET_DIALOG_DATA]: (state, action) => {
      if (action.payload) {
        const { name, ...other } = action.payload;
        return state.update(name, el => el.merge(other));
      }
      return state;
    }
  },
  Map()
);
