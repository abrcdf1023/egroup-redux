import { fromJS } from 'immutable';
import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA,
  initializeSnackbar,
  openSnackbar,
  closeSnackbar,
  setSnackbarData,
  reducer,
  getSnackbarStates
} from './snackbars';

const snackbarName = 'globalSnackbar';

describe('snackbar actions', () => {
  it('should create an action to initialize snackbar', () => {
    const expectedAction = {
      type: INITIALIZE_SNACKBAR,
      payload: snackbarName
    };
    expect(initializeSnackbar(snackbarName)).toEqual(expectedAction);
  });

  it('should create an action to open snackbar', () => {
    const expectedAction = {
      type: OPEN_SNACKBAR,
      payload: snackbarName
    };
    expect(openSnackbar(snackbarName)).toEqual(expectedAction);
  });

  it('should create an action to close snackbar', () => {
    const expectedAction = {
      type: CLOSE_SNACKBAR,
      payload: snackbarName
    };
    expect(closeSnackbar(snackbarName)).toEqual(expectedAction);
  });

  it('should create an action to set snackbar data', () => {
    const data = {
      message: 'message',
      title: 'title'
    };
    const expectedAction = {
      type: SET_SNACKBAR_DATA,
      payload: data
    };
    expect(setSnackbarData(data)).toEqual(expectedAction);
  });
});

describe('snackbar reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle INITIALIZE_SNACKBAR', () => {
    const state = fromJS({});
    expect(reducer(state, initializeSnackbar(snackbarName))).toEqual(
      fromJS({
        [snackbarName]: {
          isOpen: false
        }
      })
    );
    expect(reducer(state, initializeSnackbar())).toEqual(state);
  });

  it('should handle OPEN_SNACKBAR', () => {
    const state = fromJS({
      [snackbarName]: {
        isOpen: false
      }
    });
    expect(reducer(state, openSnackbar(snackbarName))).toEqual(
      fromJS({
        [snackbarName]: {
          isOpen: true
        }
      })
    );
    expect(reducer(state, openSnackbar())).toEqual(state);
  });

  it('should handle CLOSE_SNACKBAR', () => {
    const state = fromJS({
      [snackbarName]: {
        isOpen: true
      }
    });
    expect(reducer(state, closeSnackbar(snackbarName))).toEqual(
      fromJS({
        [snackbarName]: {
          isOpen: false
        }
      })
    );
    expect(reducer(state, closeSnackbar())).toEqual(state);
  });

  it('should handle SET_SNACKBAR_DATA', () => {
    const state = fromJS({
      [snackbarName]: {
        isOpen: false
      }
    });
    expect(
      reducer(
        state,
        setSnackbarData({
          name: snackbarName,
          message: 'message',
          title: 'title'
        })
      )
    ).toEqual(
      fromJS({
        [snackbarName]: {
          isOpen: false,
          message: 'message',
          title: 'title'
        }
      })
    );
    expect(reducer(state, setSnackbarData())).toEqual(state);
  });
});

describe('snackbar selectors', () => {
  const snackbarStates = fromJS({
    isOpen: false,
    message: 'message',
    title: 'title'
  });
  const state = fromJS({
    snackbars: {
      [snackbarName]: snackbarStates
    }
  });
  it('should get snackbar states by snackbar name', () => {
    expect(getSnackbarStates(state, null, snackbarName)).toEqual(
      snackbarStates
    );
  });
});
