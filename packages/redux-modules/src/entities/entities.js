import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const isList = List.isList;

/**
 * Types
 */
export const SET_ENTITIES = 'SET_ENTITIES';
export const SET_ENTITIES_SHALLOW = 'SET_ENTITIES_SHALLOW';

/**
 * Actions
 */
export const setEntities = createAction(SET_ENTITIES);
export const setEntitiesShallow = createAction(SET_ENTITIES_SHALLOW);

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
    },
    [SET_ENTITIES_SHALLOW]: (state, action) => {
      if (action.payload) {
        return state.merge(action.payload);
      }
      return state;
    }
  },
  fromJS({})
);
