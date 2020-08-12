import { Map } from 'immutable';

export const getSnackbarStates = (state, props, name) =>
  state.getIn(['snackbars', name], Map());
