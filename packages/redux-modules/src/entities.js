import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const isList = List.isList;

/**
 * Types
 */
export const SET_ENTITIES = 'SET_ENTITIES';

/**
 * Actions
 */
export const setEntities = createAction(SET_ENTITIES);

/**
 * Selectors
 */
export const getEntities = state => state.get('entities');

/**
 * Reducer
 */
export const reducer = handleActions(
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
