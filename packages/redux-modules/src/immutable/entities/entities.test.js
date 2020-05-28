import { fromJS } from 'immutable';
import { setEntities, setEntitiesShallow, reducer } from '../../entities';

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
