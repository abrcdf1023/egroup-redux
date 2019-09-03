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

const leafs = ['components', 'list', 'fetchGetMember'];

describe('apis module actions', () => {
  it('should create an action to take api', () => {
    const expectedAction = {
      type: EG_API_TAKE,
      payload: { leafs }
    };
    expect(egApiTake({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to request api', () => {
    const expectedAction = {
      type: EG_API_REQUEST,
      payload: { leafs }
    };
    expect(egApiRequest({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to cancel api', () => {
    const expectedAction = {
      type: EG_API_CANCEL,
      payload: { leafs }
    };
    expect(egApiCancel({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to handle api success with response', () => {
    const response = {
      data: 'data'
    };
    const expectedAction = {
      type: EG_API_SUCCESS,
      payload: { leafs, response }
    };
    expect(egApiSuccess({ leafs, response })).toEqual(expectedAction);
  });

  it('should create an action to handle api success without response', () => {
    const expectedAction = {
      type: EG_API_SUCCESS,
      payload: { leafs }
    };
    expect(egApiSuccess({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to handle api error', () => {
    const error = new Error();
    const expectedAction = {
      type: EG_API_FAILURE,
      payload: { leafs, error }
    };
    expect(egApiFailure({ leafs, error })).toEqual(expectedAction);
  });

  it('should create an action to handle api without error', () => {
    const expectedAction = {
      type: EG_API_FAILURE,
      payload: { leafs }
    };
    expect(egApiFailure({ leafs })).toEqual(expectedAction);
  });
});

describe('apis module reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle EG_API_TAKE', () => {
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isError: false
          }
        }
      }
    });
    expect(reducer(fromJS({}), egApiTake({ leafs }))).toEqual(expectedState);
  });

  it('should handle EG_API_REQUEST', () => {
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: true
          }
        }
      }
    });
    expect(reducer(fromJS({}), egApiRequest({ leafs }))).toEqual(expectedState);
  });

  it('should handle EG_API_CANCEL', () => {
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: false
          }
        }
      }
    });
    expect(reducer(fromJS({}), egApiCancel({ leafs }))).toEqual(expectedState);
  });

  it('should handle EG_API_SUCCESS with response', () => {
    const response = fromJS({
      data: 'data'
    });
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: false,
            response
          }
        }
      }
    });
    expect(
      reducer(
        fromJS({}),
        egApiSuccess({
          leafs,
          response
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_API_SUCCESS without response', () => {
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: false
          }
        }
      }
    });
    expect(
      reducer(
        fromJS({}),
        egApiSuccess({
          leafs
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_API_FAILURE with error', () => {
    const error = new Error();
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: false,
            isError: true,
            error
          }
        }
      }
    });
    expect(
      reducer(
        fromJS({}),
        egApiFailure({
          leafs,
          error
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_API_FAILURE without error', () => {
    const expectedState = fromJS({
      components: {
        list: {
          fetchGetMember: {
            isLoading: false,
            isError: true
          }
        }
      }
    });
    expect(
      reducer(
        fromJS({}),
        egApiFailure({
          leafs
        })
      )
    ).toEqual(expectedState);
  });
});
