import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { createActions } from 'redux-actions';
import { Map } from 'immutable';
import fetchMock from 'fetch-mock';
import createHandleApisMiddleware from './createHandleApisMiddleware';
import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE
} from '../apis';

const mockStore = configureStore([createHandleApisMiddleware(), thunk]);

const actionCreator = createActions({
  COMPONENTS: {
    LIST: {
      FETCH_GET_MEMBER: undefined,
      FETCH_GET_MEMBER_REQUEST: undefined,
      FETCH_GET_MEMBER_CANCEL: undefined,
      FETCH_GET_MEMBER_SUCCESS: undefined,
      FETCH_GET_MEMBER_FAILURE: undefined
    }
  }
});

const {
  fetchGetMember,
  fetchGetMemberRequest,
  fetchGetMemberCancel,
  fetchGetMemberSuccess,
  fetchGetMemberFailure
} = actionCreator.components.list;

describe('createHandleApisMiddleware', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should dispatch none fetch action', () => {
    const store = mockStore(Map());
    store.dispatch({
      type: 'CLOSE_WINDOW'
    });
    const actions = store.getActions();
    const expectedPayload = {
      type: 'CLOSE_WINDOW'
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should dispatch egApiTake', () => {
    const store = mockStore(Map());
    store.dispatch(fetchGetMember());
    const actions = store.getActions();
    const expectedPayload = {
      type: EG_API_TAKE,
      payload: {
        leafs: ['components', 'list', 'fetchGetMember']
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should dispatch egApiRequest', () => {
    const store = mockStore(Map());
    store.dispatch(fetchGetMemberRequest());
    const actions = store.getActions();
    const expectedPayload = {
      type: EG_API_REQUEST,
      payload: {
        leafs: ['components', 'list', 'fetchGetMember']
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should dispatch egApiCancel', () => {
    const store = mockStore(Map());
    store.dispatch(fetchGetMemberCancel());
    const actions = store.getActions();
    const expectedPayload = {
      type: EG_API_CANCEL,
      payload: {
        leafs: ['components', 'list', 'fetchGetMember']
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should dispatch egApiSuccess', () => {
    const store = mockStore(Map());
    store.dispatch(fetchGetMemberSuccess());
    const actions = store.getActions();
    const expectedPayload = {
      type: EG_API_SUCCESS,
      payload: {
        leafs: ['components', 'list', 'fetchGetMember']
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should dispatch egApiFailure', () => {
    const store = mockStore(Map());
    store.dispatch(fetchGetMemberFailure());
    const actions = store.getActions();
    const expectedPayload = {
      type: EG_API_FAILURE,
      payload: {
        leafs: ['components', 'list', 'fetchGetMember']
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should fetch member success', done => {
    const data = { memberId: 11111 };
    const store = mockStore(Map());
    const expectedActions = [
      {
        type: EG_API_TAKE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember']
        }
      },
      {
        type: EG_API_REQUEST,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember']
        }
      },
      {
        type: EG_API_SUCCESS,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
          response: data
        }
      }
    ];

    fetchMock.get('http://good.com/', data);

    store.dispatch(fetchGetMember());
    store.dispatch(fetchGetMemberRequest());
    fetch('http://good.com/')
      .then(res => res.json())
      .then(data => {
        store.dispatch(fetchGetMemberSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should fetch member failure', done => {
    const store = mockStore(Map());
    const expectedActions = [
      {
        type: EG_API_TAKE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember']
        }
      },
      {
        type: EG_API_REQUEST,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember']
        }
      },
      {
        type: EG_API_FAILURE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
          error: new TypeError('Failed to fetch')
        }
      }
    ];

    fetchMock.get('http://good.com/', {
      throws: new TypeError('Failed to fetch')
    });

    store.dispatch(fetchGetMember());
    store.dispatch(fetchGetMemberRequest());
    fetch('http://good.com/').catch(error => {
      store.dispatch(fetchGetMemberFailure(error));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
