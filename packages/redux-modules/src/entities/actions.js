import { createAction } from 'redux-actions';

import { SET_ENTITIES, SET_ENTITIES_SHALLOW } from './types';

export const setEntities = createAction(SET_ENTITIES, null, (p, m) => m);
export const setEntitiesShallow = createAction(
  SET_ENTITIES_SHALLOW,
  null,
  (p, m) => m
);
