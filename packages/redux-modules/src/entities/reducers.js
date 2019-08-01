import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { SET_ENTITIES } from './types';

const isList = List.isList;
const reducer = handleActions(
  {
    [SET_ENTITIES]: (state, action) => {
      if (action.payload) {
        return state.mergeWith(function merger(a, b) {
          if (a && a.mergeWith && !isList(a) && !isList(b)) {
            return a.mergeWith(merger, b);
          }
          return b;
        }, action.payload);
      }
      return state;
    }
  },
  fromJS({})
);

export default reducer;
