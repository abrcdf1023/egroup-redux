import { getSnackbarStates } from './selectors';

const snackbarName = 'globalSnackbar';

describe('snackbar selectors', () => {
  const snackbarStates = {
    isOpen: false,
    message: 'message',
    title: 'title'
  };
  const state = {
    snackbars: {
      [snackbarName]: snackbarStates
    }
  };
  it('should get snackbar states by snackbar name', () => {
    expect(getSnackbarStates(state, null, snackbarName)).toEqual(
      snackbarStates
    );
  });
});
