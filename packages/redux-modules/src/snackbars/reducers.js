import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR
} from './types';

const reducer = handleActions(
  {
    [INITIALIZE_SNACKBAR]: (state, action) => {
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
    [SET_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.update(action.payload.name, el =>
          el.merge(action.payload).delete('name')
        );
      }
      return state;
    }
  },
  fromJS({})
);

export default reducer;
