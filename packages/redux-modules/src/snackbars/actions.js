import { createAction } from 'redux-actions';

import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA
} from './types';

export const initializeSnackbar = createAction(INITIALIZE_SNACKBAR);
export const openSnackbar = createAction(OPEN_SNACKBAR);
export const closeSnackbar = createAction(CLOSE_SNACKBAR);
export const setSnackbarData = createAction(SET_SNACKBAR_DATA);
