import { createAction } from 'redux-actions';

import {
  SET_ENTITIES,
  SET_ENTITIES_SHALLOW,
  SET_ENTITIES_ARRAY_CONCAT,
  DELETE_ENTITIES_IN,
} from './types';

export const setEntities = createAction(SET_ENTITIES, null, (p, m) => m);
export const setEntitiesShallow = createAction(
  SET_ENTITIES_SHALLOW,
  null,
  (p, m) => m
);
export const setEntitiesArrayConcat = createAction(
  SET_ENTITIES_ARRAY_CONCAT,
  null,
  (p, m) => m
);
export const deleteEntitiesIn = createAction(DELETE_ENTITIES_IN);
