import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

import merger from './merger';

/**
 * Types
 */
export const SET_ENTITIES = 'SET_ENTITIES';
export const SET_ENTITIES_SHALLOW = 'SET_ENTITIES_SHALLOW';

/**
 * Actions
 */
export const setEntities = createAction(SET_ENTITIES, null, (p, m) => m);
export const setEntitiesShallow = createAction(
  SET_ENTITIES_SHALLOW,
  null,
  (p, m) => m
);

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
