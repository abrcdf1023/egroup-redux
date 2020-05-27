import { fromJS } from 'immutable';
import {
  SET_ENTITIES,
  SET_ENTITIES_SHALLOW,
  setEntities,
  setEntitiesShallow,
  reducer,
  getEntities
} from './entities';

const defaultEntities = {
  users: {
    1: {
      id: '1',
      name: 'Jerry',
      roles: {
        admin: {
          roleName: 'admin',
          roleStatus: 'checked'
        }
      }
    }
  }
};
const entities = {
  users: {
    1: {
      id: '1',
      name: 'Jerry',
      roles: {}
    }
  }
};

describe('entities actions', () => {
  it('should create an action to set entities', () => {
    const expectedAction = {
      type: SET_ENTITIES,
      payload: entities
    };
    expect(setEntities(entities)).toEqual(expectedAction);
  });

  it('should create an action to set entities with meta', () => {
    const expectedAction = {
      type: SET_ENTITIES,
      payload: entities.users,
      meta: {
        path: ['users']
      }
    };
    expect(
      setEntities(entities.users, {
        path: ['users']
      })
    ).toEqual(expectedAction);
  });

  it('should create an action to set entities shallow', () => {
    const expectedAction = {
      type: SET_ENTITIES_SHALLOW,
      payload: entities
    };
    expect(setEntitiesShallow(entities)).toEqual(expectedAction);
  });

  it('should create an action to set entities shallow with meta', () => {
    const expectedAction = {
      type: SET_ENTITIES_SHALLOW,
      payload: entities.users,
      meta: {
        path: ['users']
      }
    };
    expect(
      setEntitiesShallow(entities.users, {
        path: ['users']
      })
    ).toEqual(expectedAction);
  });
});

describe('entities reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle SET_ENTITIES', () => {
    expect(reducer(fromJS({}), setEntities(fromJS(entities)))).toEqual(
      fromJS(entities)
    );
  });

  it('should handle SET_ENTITIES without value', () => {
    expect(reducer(fromJS({}), setEntities())).toEqual(fromJS({}));
  });

  it('should handle SET_ENTITIES with meta', () => {
    expect(
      reducer(
        fromJS({}),
        setEntities(fromJS(entities.users), {
          path: ['users']
        })
      )
    ).toEqual(fromJS(entities));

    expect(
      reducer(
        fromJS(defaultEntities),
        setEntities(fromJS(entities.users), {
          path: ['users']
        })
      )
    ).toEqual(fromJS(defaultEntities));
  });

  it('should handle SET_ENTITIES with default entities', () => {
    expect(
      reducer(fromJS(defaultEntities), setEntities(fromJS(entities)))
    ).toEqual(fromJS(defaultEntities));
  });

  it('should handle SET_ENTITIES_SHALLOW', () => {
    expect(reducer(fromJS({}), setEntitiesShallow(fromJS(entities)))).toEqual(
      fromJS(entities)
    );
  });

  it('should handle SET_ENTITIES_SHALLOW without value', () => {
    expect(reducer(fromJS({}), setEntitiesShallow())).toEqual(fromJS({}));
  });

  it('should handle SET_ENTITIES_SHALLOW with meta', () => {
    expect(
      reducer(
        fromJS({}),
        setEntitiesShallow(fromJS(entities.users), {
          path: ['users']
        })
      )
    ).toEqual(fromJS(entities));

    expect(
      reducer(
        fromJS({
          users: {
            1: {
              id: '1',
              name: 'Leo'
            }
          }
        }),
        setEntitiesShallow(fromJS(entities.users), {
          path: ['users']
        })
      )
    ).toEqual(fromJS(entities));
  });

  it('should handle SET_ENTITIES_SHALLOW with default entities', () => {
    expect(
      reducer(fromJS(defaultEntities), setEntitiesShallow(fromJS(entities)))
    ).toEqual(fromJS(entities));
  });
});

describe('dialog selectors', () => {
  const rootStates = fromJS(defaultEntities);
  const state = fromJS({
    entities: defaultEntities
  });
  it('should get entities', () => {
    expect(getEntities(state)).toEqual(rootStates);
  });
});
