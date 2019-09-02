import { fromJS } from 'immutable';
import { INIT_API, initApi, reducer } from './apis';

describe('api actions', () => {
  it('should create an action to initialize api', () => {
    const expectedAction = {
      type: INIT_API
    };
    expect(initApi()).toEqual(expectedAction);
  });
});

describe('api reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle INIT_API', () => {
    const leafs = ['components', 'list', 'fetchGetMember'];
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: false,
            isError: false
          }
        }
      }
    });
    expect(reducer(fromJS({}), initApi(leafs))).toEqual(expectedState);
  });
});
