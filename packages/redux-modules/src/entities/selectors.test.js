import { getEntities } from './selectors';
import { fromJS } from 'immutable';

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

describe('entities selectors', () => {
  const rootStates = fromJS(defaultEntities);
  const state = fromJS({
    entities: defaultEntities
  });
  it('should get entities', () => {
    expect(getEntities(state)).toEqual(rootStates);
  });
});
