import { getIn } from '../utils';

export const getSnackbarStates = (state, props, name) =>
  getIn(state, ['snackbars', name], {});
