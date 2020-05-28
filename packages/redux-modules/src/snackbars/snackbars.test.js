import {
  initializeSnackbar,
  openSnackbar,
  closeSnackbar,
  setSnackbarData
} from './actions';
import { reducer } from './snackbars';

const snackbarName = 'globalSnackbar';

describe('snackbar reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle INITIALIZE_SNACKBAR', () => {
    const state = {};
    const initializeState = {
      [snackbarName]: {
        isOpen: false
      }
    };
    expect(reducer(state, initializeSnackbar(snackbarName))).toEqual(
      initializeState
    );
    expect(reducer(state, initializeSnackbar())).toEqual(state);
    expect(reducer(state, initializeSnackbar({}))).toEqual(state);
    expect(reducer(initializeState, initializeSnackbar(snackbarName))).toEqual(
      initializeState
    );
  });

  it('should handle OPEN_SNACKBAR', () => {
    const state = {
      [snackbarName]: {
        isOpen: false
      }
    };
    expect(reducer(state, openSnackbar(snackbarName))).toEqual({
      [snackbarName]: {
        isOpen: true
      }
    });
    expect(reducer(state, openSnackbar())).toEqual(state);
    expect(reducer(state, openSnackbar({}))).toEqual(state);
  });

  it('should handle CLOSE_SNACKBAR', () => {
    const state = {
      [snackbarName]: {
        isOpen: true
      }
    };
    expect(reducer(state, closeSnackbar(snackbarName))).toEqual({
      [snackbarName]: {
        isOpen: false
      }
    });
    expect(reducer(state, closeSnackbar())).toEqual(state);
    expect(reducer(state, closeSnackbar({}))).toEqual(state);
  });

  it('should handle SET_SNACKBAR_DATA', () => {
    const state = {
      [snackbarName]: {
        isOpen: false
      }
    };
    expect(
      reducer(
        state,
        setSnackbarData({
          name: snackbarName,
          message: 'message',
          title: 'title'
        })
      )
    ).toEqual({
      [snackbarName]: {
        isOpen: false,
        message: 'message',
        title: 'title'
      }
    });
    expect(reducer(state, setSnackbarData())).toEqual(state);
    expect(reducer(state, setSnackbarData('foo'))).toEqual(state);
  });
});
