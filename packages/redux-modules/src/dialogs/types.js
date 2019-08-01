import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogTitle,
  setDialogMessage
} from './actions';

export const INITIALIZE_DIALOG = initializeDialog().type;
export const OPEN_DIALOG = openDialog().type;
export const CLOSE_DIALOG = closeDialog().type;
export const SET_DIALOG_TITLE = setDialogTitle().type;
export const SET_DIALOG_MESSAGE = setDialogMessage().type;
