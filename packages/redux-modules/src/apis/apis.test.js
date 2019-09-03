import { fromJS } from 'immutable';
import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE,
  egApiTake,
  egApiRequest,
  egApiCancel,
  egApiSuccess,
  egApiFailure,
  reducer
} from './apis';

describe('api actions', () => {
  it('should create an action to take api', () => {
    const expectedAction = {
      type: EG_API_TAKE
    };
    expect(egApiTake()).toEqual(expectedAction);
  });

  it('should create an action to request api', () => {
    const expectedAction = {
      type: EG_API_REQUEST
    };
    expect(egApiRequest()).toEqual(expectedAction);
  });
});

describe('api reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle EG_API_TAKE', () => {
    const leafs = ['components', 'list', 'fetchGetMember'];
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isError: false
          }
        }
      }
    });
    expect(reducer(fromJS({}), egApiTake(leafs))).toEqual(expectedState);
  });
});
