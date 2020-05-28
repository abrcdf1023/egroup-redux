import { handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

import merger from '../utils/merger';

import { SET_ENTITIES, SET_ENTITIES_SHALLOW } from './types';

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [SET_ENTITIES]: (state, action) => {
      if (action.payload) {
        if (action.meta && typeof Array.isArray(action.meta.path)) {
          return state.setIn(
            action.meta.path,
            state
              .getIn(action.meta.path, Map())
              .mergeWith(merger, action.payload)
          );
        }
        return state.mergeWith(merger, action.payload);
      }
      return state;
    },
    [SET_ENTITIES_SHALLOW]: (state, action) => {
      if (action.payload) {
        if (action.meta && typeof Array.isArray(action.meta.path)) {
          return state.mergeIn(action.meta.path, action.payload);
        }
        return state.merge(action.payload);
      }
      return state;
    }
  },
  fromJS({})
);
