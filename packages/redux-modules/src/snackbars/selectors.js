import getIn from '@e-group/utils/getIn';

export const getSnackbarStates = (state, props, name) =>
  getIn(state, ['snackbars', name], {});
