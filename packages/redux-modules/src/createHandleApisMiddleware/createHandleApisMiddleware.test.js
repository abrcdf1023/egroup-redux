import { createActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../apis';
import createHandleApisMiddleware from './createHandleApisMiddleware';

const handleApisMiddleware = createHandleApisMiddleware();
const store = createStore(reducer, applyMiddleware(handleApisMiddleware));

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

const FETCH_GET_MEMBER = fetchGetMember().type;
const FETCH_GET_MEMBER_REQUEST = fetchGetMemberRequest().type;
const FETCH_GET_MEMBER_CANCEL = fetchGetMemberCancel().type;
const FETCH_GET_MEMBER_SUCCESS = fetchGetMemberSuccess().type;
const FETCH_GET_MEMBER_FAILURE = fetchGetMemberFailure().type;

it('should dispatch initApi automatically.', () => {
  store.dispatch({
    type: FETCH_GET_MEMBER
  });
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
  expect(store.getState()).toEqual(expectedState);
});
