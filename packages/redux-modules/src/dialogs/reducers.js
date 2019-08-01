import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_TITLE,
  SET_DIALOG_MESSAGE
} from './types';

const reducer = handleActions(
  {
    [INITIALIZE_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.set(
          action.payload,
          fromJS({
            isOpen: false
          })
        );
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
    [SET_DIALOG_TITLE]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload.name, 'title'], action.payload.text);
      }
      return state;
    },
    [SET_DIALOG_MESSAGE]: (state, action) => {
      if (action.payload) {
        return state.setIn(
          [action.payload.name, 'message'],
          action.payload.text
        );
      }
      return state;
    }
  },
  fromJS({})
);

export default reducer;
