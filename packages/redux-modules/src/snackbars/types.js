import {
  initializeSnackbar,
  openSnackbar,
  closeSnackbar,
  setSnackbar
} from './actions';

export const INITIALIZE_SNACKBAR = initializeSnackbar().type;
export const OPEN_SNACKBAR = openSnackbar().type;
export const CLOSE_SNACKBAR = closeSnackbar().type;
export const SET_SNACKBAR = setSnackbar().type;
